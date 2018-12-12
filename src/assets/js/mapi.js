import axios from 'axios'
import router from '../../router'

/**
 * 供调用的 MAPI 对象
 */

/* eslint-disable */
var MAPI = {};

export default MAPI;

/**
 * 闭包形式初始化
 */
(function () {

    var CONFIG = {
        globalErrorHandler: function (responseDataWrapper, response, callback) {

        },
        httpApi: ''
    };

    var TYPE_ANDROID = 1, TYPE_IOS = 2, TYPE_OTHER = 0;

    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/Lanyidai Android/i.test(userAgent)) {
            return TYPE_ANDROID;
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/Lanyidai iOS/.test(userAgent) && !window.MSStream) {
            return TYPE_IOS;
        }

        return TYPE_OTHER;
    }

    /**
     * 初始化
     * @param callback
     * @returns {*}
     */
    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge);
            return;
        }

        var osType = getMobileOperatingSystem();
        switch (osType) {
            case TYPE_ANDROID: {
                document.addEventListener(
                    'WebViewJavascriptBridgeReady'
                    , function () {
                        callback(WebViewJavascriptBridge)
                    },
                    false
                );
                break;
            }
            case TYPE_IOS: {
                if (window.WVJBCallbacks) {
                    window.WVJBCallbacks.push(callback);
                    break;
                }
                window.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'https://__bridge_loaded__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function () {
                    document.documentElement.removeChild(WVJBIframe)
                }, 0);
                break;
            }
            default: {
                if (CONFIG.httpApi) {
                    window.WebViewJavascriptBridge = {
                        init: function (callback) {
                            // empty init method
                        },
                        registerHandler: function(handler, handlerCallback) {
                            //
                        },
                        callHandler: function (handler, params, handlerCallback) {
                            // 创建一个axios实例
                            const instance = axios.create({
                                // 设置默认根地址
                                baseURL: CONFIG.httpApi,
                                // 设置请求超时设置
                                timeout: 5000,
                                // 设置请求时的header
                                headers: {
                                    // 跨域请求 这个配置不能少
                                    // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                                    'Accept': 'application/json'
                                }
                              })
                            return instance({method: 'post', data: params, withCredentials: true})
                                .then(resp => {
                                    if (handlerCallback) {
                                        handlerCallback(resp.data);
                                    }
                                })
                                .catch((error) => {
                                    // 请求失败时,根据业务判断状态
                                    if (error.response) {
                                        console.log('出错了' + error)
                                        // TODO 封装出错时的返回对象供错误处理
                                        let responseData = {}
                                        if (handlerCallback) {
                                            handlerCallback(responseData);
                                        }
                                    }
                                })
                        }
                    };
                    callback(WebViewJavascriptBridge);
                    /*
                    console.log(CONFIG)
                    // 创建一个axios实例
                    const instance = axios.create({
                      // 设置默认根地址
                      baseURL: baseURL,
                      // 设置请求超时设置
                      timeout: 2000,
                      // 设置请求时的header
                      headers: {
                        'X-Powered-By': 'lancai'
                      }
                    })
                    // 请求处理
                    let a = instance(options)
                    console.log(a)
                    var jQuery = CONFIG.jQuery;
                    jQuery(document).ready(function () {
                        window.WebViewJavascriptBridge = {
                            init: function (callback) {
                                // empty init method
                            },
                            callHandler: function (handler, params, handlerCallback) {
                                jQuery.ajax({
                                    url: CONFIG.httpApi,
                                    type: 'POST',
                                    dataType: 'json',
                                    data: params,
                                    success: function (responseData) {
                                        if (handlerCallback) {
                                            handlerCallback(responseData);
                                        }
                                    }
                                });
                            }
                        };
                        callback(WebViewJavascriptBridge);
                    });
                    */
                    return
                } else {
                    throw 'unsupported system';
                }
            }
        }
    }

    MAPI.init = function (config) {
        if (config) {
            if (config.globalErrorHandler) {
                CONFIG.globalErrorHandler = config.globalErrorHandler;
            }
            if (config.httpApi) {
                CONFIG.httpApi = config.httpApi;
            }
        }

        setupWebViewJavascriptBridge(function (bridge) {
            bridge.init(function (message, responseCallback) {
            });

          bridge.registerHandler("_backPressedHandler", function(data, callback) {
            if (router.history.current.query.from === 'android') {
              if (callback) {
                // return true to execute native back
                callback(true);
              }
            } else {
              router.go(-1)
              if (callback) {
                // return true to execute native back
                callback(false);
              }
            }
           /* if (callback) {
              // return true to execute native back
              callback(true);
            }*/
          });
        });
    };

    MAPI.execute = function (params) {
        var requestDataWrapper = {
            command: params.command,
            requestData: JSON.stringify(params.request),
            page: params.page,
            clientInfo: params.clientInfo === undefined ? {platform: '4'} : params.clientInfo
        };

        setupWebViewJavascriptBridge(function (bridge) {
            WebViewJavascriptBridge.callHandler('_submitMAPI', requestDataWrapper, function (responseData) {
                    var responseDataWrapper;
                    if (typeof responseData === 'object') {
                        responseDataWrapper = responseData;
                    } else {
                        responseDataWrapper = JSON.parse(responseData);
                    }
                    var response = responseDataWrapper.data ? JSON.parse(responseDataWrapper.data) : null;
                    if (responseDataWrapper.code !== 0) {
                        if (params.ignoreGlobalErrorHandler) {
                            if (params.error) {
                                params.error(responseDataWrapper, response);
                            }
                        } else {
                            CONFIG.globalErrorHandler(responseDataWrapper, response, params.error);
                        }
                    } else {
                        if (params.success) {
                            params.success(responseDataWrapper, response);
                        }
                    }
                }
            );
        });
    };

    MAPI.getUserInfo = function (params) {
      setupWebViewJavascriptBridge(function (bridge) {
        WebViewJavascriptBridge.callHandler('_getUserInfo', params, function (response) {
            let userInfo = JSON.parse(response);
            if (params.callback) {
              params.callback(userInfo)
            }
          }
        );
      });
    };

    MAPI.showSuccess = function (params) {
    let jsMessageWrapper = {
      title: params.title,
      content: params.content
    };

    setupWebViewJavascriptBridge(function (bridge) {
      WebViewJavascriptBridge.callHandler('_showSuccess', jsMessageWrapper, function (response) {
          let jsMessageResp = JSON.parse(response);
          if (params.callback) {
            params.callback(jsMessageResp)
          }
        }
      );
    });
  };

    MAPI.showError = function (params) {
    let jsMessageWrapper = {
      title: params.title,
      content: params.content
    };

    setupWebViewJavascriptBridge(function (bridge) {
      WebViewJavascriptBridge.callHandler('_showError', jsMessageWrapper, function (response) {
          let jsMessageResp = JSON.parse(response);
          if (params.callback) {
            params.callback(jsMessageResp)
          }
        }
      );
    });
  };

    MAPI.showConfirm = function (params) {
    let jsMessageWrapper = {
      title: params.title,
      content: params.content
    };

    setupWebViewJavascriptBridge(function (bridge) {
      WebViewJavascriptBridge.callHandler('_showConfirm', jsMessageWrapper, function (response) {
          let jsMessageResp = JSON.parse(response);
          if (params.callback) {
            params.callback(jsMessageResp)
          }
        }
      );
    });
  };

    MAPI.executeReturn = function (params) {
    let jsMessageWrapper = {
    };

    setupWebViewJavascriptBridge(function (bridge) {
      WebViewJavascriptBridge.callHandler('_executeReturn', jsMessageWrapper, function (response) {
          //let jsMessageResp = JSON.parse(response);
          if (params.callback) {
            params.callback()
          }
        }
      );
    });
  };

    MAPI.executeNavigate = function (params) {
      let url = params.url

      setupWebViewJavascriptBridge(function (bridge) {
        WebViewJavascriptBridge.callHandler('_executeNavigate', url, function (response) {
          if (params.callback) {
            params.callback(response)
          }
        });
      });
  };
})();
