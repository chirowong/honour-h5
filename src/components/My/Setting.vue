<template>
  <div id='main'>
    <Header title="设置"></Header>

    <div id="container">
      <div class='content'>
        <Row>
        <Col span="24" class="user-operation">
            <Row class="user-operation-list">
              <router-link to="/changePassword">
              <Col span="24" class="user-operation-item">
                  <div class="user-operation-item-icon"><img src="../../assets/images/ic_my_setting_password_@2x.png"/></div>
                  <div class="user-operation-item-left">修改密码</div>
                  <div class="user-operation-item-right"><img src="../../assets/images/ic_arrow_right_@2x.png"/></div>
              </Col>
              </router-link>
            </Row>
        </Col>
      </Row>
      <div class="logout-btn-container">
        <mt-button type="primary" size="large" @click='logout'>退出登录</mt-button>
      </div>
      </div> <!-- content end -->
    </div> <!-- container end -->
  </div><!-- main end -->
</template>

<script>
import {logout} from '../../api/logout'
import { confirm, goBack } from '../../assets/js/common'

export default {
  methods: {
    goBack () {
      goBack()
    },
    logout () {
      confirm('您确定要退出吗?', '', function () {
        logout()
      })
    }
  }
}
</script>

<style type="text/less" lang='less' scoped>
.user-operation {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content:center;
  background-color: #fff;
}

.user-operation-list {
  width: 345px;
}

.user-operation-item {
  height: 45px;
  line-height: 45px;
  border-bottom: #dae0e8 1px solid;
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
  width: 75%;
  color: #444f5c;
  font-size: 15px;
  margin-left: 11.5px;
}

.user-operation-item-right {
  float: right;
  width: 10%;
  text-align: right;
  color: #24272b;
  font-size: 15px;
  padding-right: 10px;
}

.user-operation-item-right img {
  width: 9px;
  height: 14px;
}

.logout-btn-container {
  margin-top: 124px;
}
</style>
