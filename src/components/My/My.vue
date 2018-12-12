<template>
  <div id='big-main'>
    <!-- 头部 -->
    <div id='big-header'>
      <div class="title">
        我的
        <router-link to="/setting">
        <div class="setting"><img src="../../assets/images/ic_my_setting_@2x.png"/></div>
        </router-link>
      </div>
    </div>
    <div class="big-content">
        <div class="user-info">
            <div class="user-info-bg">
              <div class="user-head-portrait">
                  <img src="../../assets/images/ic_my_headpic2_@2x.png" width="62px" height="62px"/>
              </div>
              <div class="user-login">
                  <span v-if="!is_login">
                    <router-link to="/login">立即登录</router-link>
                  </span>
                  <span v-if="is_login"> {{ phone }}</span>
              </div>
              <div class="user-login-status">
                  <template v-if="!is_login">
                    <div class="unlogin">未登录</div>
                  </template>
                  <template v-else>
                    <template v-if="is_identification === 0">
                      <div class="unlogin">未实名</div>
                    </template>
                    <template v-else-if="is_identification === 1">
                      <div class="identification">已实名</div>
                    </template>
                  </template>
              </div>
            </div>
        </div>
        <div class="user-operation">
            <Row>
              <Col span="24" class="user-operation-item">
                  <div class="user-operation-item-icon"><img src="../../assets/images/ic_my_6_@2x.png"/></div>
                  <div class="user-operation-item-left user-operation-item-left1">客服热线</div>
                  <div class="telephone">{{serviceHotline}}</div>
              </Col>
            </Row>
            <Row>
              <router-link to='/about/us'>
                <Col span="24" class="user-operation-item">
                    <div class="user-operation-item-icon"><img src="../../assets/images/ic_my_7_@2x.png"/></div>
                    <div class="user-operation-item-left">关于我们</div>
                    <div class="user-operation-item-right"><img src="../../assets/images/ic_arrow_right_@2x.png"/></div>
                </Col>
              </router-link>
            </Row>
        </div>
    </div>
    <!-- 底部 -->
    <div id="footer">
      <Row>
        <Col span="12">
          <router-link to='/'>
          <div class="tab-home">
            <div class="tab-home-icon"></div>
             首页
          </div>
          </router-link>
        </Col>
        <Col span="12">
          <div class="tab-wo active">
            <div class="tab-wo-icon active"></div>
            我的
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import {getUserInfo, goBack, formatMoney} from '../../assets/js/common'
import {identification} from '../../api/identification'
import {queryBorrowViewStatus} from '../../api/borrowList'
import {queryAppPublishInfo} from '../../api/appPublishInfo'
import {
  COIN_BORROW_STATUS_PAYING,
  COIN_BORROW_STATUS_PAY_SUCCESS,
  COIN_BORROW_STATUS_WARNING_LINE,
  COIN_BORROW_STATUS_MARGIN_CALL,
  COIN_BORROW_STATUS_CLOSED_ACCOUNT,
  COIN_BORROW_STATUS_CLOSE_OUT,
  COIN_BORROW_STATUS_PAYING_NAME,
  COIN_BORROW_STATUS_PAY_SUCCESS_NAME,
  COIN_BORROW_STATUS_WARNING_LINE_NAME,
  COIN_BORROW_STATUS_MARGIN_CALL_NAME,
  COIN_BORROW_STATUS_CLOSED_ACCOUNT_NAME,
  COIN_BORROW_STATUS_CLOSE_OUT_NAME
} from '../../api/const'

export default {
  data () {
    return {
      is_login: false,
      is_identification: -1,
      phone: '',
      serviceHotline: '',
      borrowViewStatusList: null,
      COIN_BORROW_STATUS_PAYING: COIN_BORROW_STATUS_PAYING,
      COIN_BORROW_STATUS_PAY_SUCCESS: COIN_BORROW_STATUS_PAY_SUCCESS,
      COIN_BORROW_STATUS_WARNING_LINE: COIN_BORROW_STATUS_WARNING_LINE,
      COIN_BORROW_STATUS_MARGIN_CALL: COIN_BORROW_STATUS_MARGIN_CALL,
      COIN_BORROW_STATUS_CLOSED_ACCOUNT: COIN_BORROW_STATUS_CLOSED_ACCOUNT,
      COIN_BORROW_STATUS_CLOSE_OUT: COIN_BORROW_STATUS_CLOSE_OUT,
      COIN_BORROW_STATUS_PAYING_NAME: COIN_BORROW_STATUS_PAYING_NAME,
      COIN_BORROW_STATUS_PAY_SUCCESS_NAME: COIN_BORROW_STATUS_PAY_SUCCESS_NAME,
      COIN_BORROW_STATUS_WARNING_LINE_NAME: COIN_BORROW_STATUS_WARNING_LINE_NAME,
      COIN_BORROW_STATUS_MARGIN_CALL_NAME: COIN_BORROW_STATUS_MARGIN_CALL_NAME,
      COIN_BORROW_STATUS_CLOSED_ACCOUNT_NAME: COIN_BORROW_STATUS_CLOSED_ACCOUNT_NAME,
      COIN_BORROW_STATUS_CLOSE_OUT_NAME: COIN_BORROW_STATUS_CLOSE_OUT_NAME
    }
  },
  created: function () {
    let me = this
    getUserInfo(function (user) {
      if (user) {
        me.is_login = true
        me.phone = user.phone
        me.identification()
        me.queryBorrowViewStatus()
      }
    })
    me.queryAppPublishInfo()
  },
  methods: {
    goBack () {
      goBack()
    },
    identification () {
      let me = this
      identification(function (response) {
        me.is_identification = response.verified
      })
    },
    queryBorrowViewStatus () {
      let me = this
      queryBorrowViewStatus(function (response) {
        me.borrowViewStatusList = response.dataList
      })
    },
    formatMoney (value) {
      return formatMoney(value, 2)
    },
    queryAppPublishInfo () {
      let me = this
      queryAppPublishInfo(function (response) {
        me.serviceHotline = response.serviceHotline
      })
    }
  }
}
</script>

<style>
.setting {
  height: 44px;
  float:right;
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 20px;
}

.setting img {
  width: 20px;
  height: 20px;
}

.user-info {
  width: 100%;
  display: flex;
  justify-content:center;
}

.user-info-bg {
    width: 345px;
    height: 158px;
    background-color: #fff;
    border: #dae0e8 0.5px solid;
    border-radius:5px;
    box-shadow: 2px 2px 1px #dae0e8;
}

.user-head-portrait {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content:center;
}

.user-login {
  width: 100%;
  margin-top: 12px;
  display: flex;
  justify-content:center;
  font-size: 17px;
  color: #737c86;
}

.user-login a {
  color: #737c86;
}

.user-login-status {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content:center;
}

.user-login-status .unlogin {
  font-size: 11px;
  color: #a7abb1;
  border: #a7abb1 1px solid;
  padding: 3px 5.5px;
  border-radius:2px;
}

.user-login-status .identification {
  font-size: 11px;
  color: #2756dc;
  border: #2756dc 1px solid;
  padding: 3px 5.5px;
  border-radius:2px;
}

.warning-info {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content:center;
}

.warning-info-bg {
    width: 345px;
    background-color: #fff;
    border: #dae0e8 0.5px solid;
    border-radius:5px;
    box-shadow: 2px 2px 1px #dae0e8;
}

.warning-info .user-operation-item-left {
  font-size: 13px;
}

.user-operation {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 50px;
  background-color: #f2f5fb;
}

.user-operation .ivu-row {

  margin: 0 auto;
}

.user-operation-item {
  height: 45px;
  border-bottom: #dae0e8 1px solid;
  display: flex;
  align-items:center;/*指定垂直靠下*/
}

.user-operation-item-icon {
  float: left;
  padding-left: 11.5px;
  width: 10%;
}

.user-operation-item-icon img {
  vertical-align: middle;
  width: 15px;
  height: 15px;
}

.user-operation-item-left {
  float: left;
  width: 80%;
  color: #444f5c;
  font-size: 15px;
  padding-left: 11.5px;
}
.user-operation-item-left1 {
  width: 50%;
}

.user-operation-item-right {
  float: right;
  color: #24272b;
  font-size: 15px;
  padding-right: 10px;
  width: 10%;
}

.user-operation-item-right img {
  width: 9px;
  height: 14px;
  float:right;
}
.telephone{
  float: right;
  font-size: 15px;
  padding-right: 10px;
  width:40%;
  text-align: right;
  color: #a7abb1;
}
</style>
