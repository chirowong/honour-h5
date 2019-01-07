import axios from 'axios'

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

    MAPI.init = function (config) {
        if (config) {
            if (config.globalErrorHandler) {
                CONFIG.globalErrorHandler = config.globalErrorHandler;
            }
            if (config.httpApi) {
                CONFIG.httpApi = config.httpApi;
            }
        }
    };

  MAPI.execute = function (params) {
    let method = params.method

    switch (method) {
      case 'get': {
        executeGet(params, function (responseData) {
          var responseDataWrapper;
          if (typeof responseData === 'object') {
            responseDataWrapper = responseData;
          } else {
            responseDataWrapper = JSON.parse(responseData);
          }

          var response = responseDataWrapper.data ? responseDataWrapper.data : null;

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
        })
        break;
      }
      case 'post': {
        executePost(params, function (responseData) {
          let responseDataWrapper;
          if (typeof responseData === 'object') {
            responseDataWrapper = responseData;
          } else {
            responseDataWrapper = JSON.parse(responseData);
          }
          let response = responseDataWrapper.data ? JSON.parse(responseDataWrapper.data) : null;
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
        })
        break;
      }
      default: {
        throw 'unsupported method';
      }
    }
  };

    function executeGet (params, handlerCallback) {
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
      return instance.get(params.url)
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
    };

  function executePost (params, handlerCallback) {
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
  };
})();
