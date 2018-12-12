<template>
  <div id='big-main'>
    <!-- 头部 -->
    <div id='big-header'>
      <div class="title">数字货币质押</div>
    </div>
    <div class="big-content">
      <div class="banner">
        <router-link to="/register">
        <div class="banner-item"></div>
        </router-link>
      </div>
      <div class="btc-price">
            <div class="real-time">实时行情</div>
            <div class="source">数据来自Bitstamp与GDAX的孰低值({{updated_time}})</div>
            <div class="price-trend">
              <span class="trend-icon" v-if="up_or_down > 0"><img src="../../assets/images/ic_lending_up_red_@2x.png"/></span>
              <span class="trend-icon" v-if="up_or_down < 0"><img src="../../assets/images/ic_lending_down_green_@2x.png"/></span>
              <span class="price">${{usd_price}}</span>
              <span class="trend">(<span v-if="trend_plus_minus > 0">+</span><span v-if="trend_plus_minus < 0"></span>{{trend}}%)</span>
            </div>
        </div>
      <div class="borrow">
          <div class="borrow-list">
              <div class="borrow-item"><div class="borrow-item-left">申请额度</div><div class="borrow-item-right">{{minAmount}}～{{maxAmount}}万元</div></div>
              <div class="borrow-item"><div class="borrow-item-left">借款期限</div><div class="borrow-item-right">{{period}}{{periodType}}</div></div>
              <div class="borrow-item"><div class="borrow-item-left">预计费用</div><div class="borrow-item-right">{{minDisbursement}}～{{maxDisbursement}}元</div></div>
              <div class="borrow-item"><div class="borrow-item-left">预计质押</div><div class="borrow-item-right">{{minPledge}}～{{maxPledge}}BTC</div></div>
          </div>
      </div>
    </div>
    <!-- 底部 -->
    <div id="footer">
      <Row>
        <Col span="12">
          <router-link to='/borrow'>
          <div class="tab-home">
            <div class="tab-home-icon"></div>
             借款
          </div>
          </router-link>
        </Col>
        <Col span="12">
          <router-link to='/my'>
          <div class="tab-wo">
            <div class="tab-wo-icon"></div>
            我的
          </div>
          </router-link>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import {queryCurrentCoinPrice} from '../../api/currentCoinPrice'
import {queryIndexLoanInfo} from '../../api/home'
import {goBack} from '../../assets/js/common'

export default {
  data () {
    return {
      usd_price: 0,
      trend: 0,
      updated_time: '',
      up_or_down: 0,
      maxAmount: 0,
      minAmount: 0,
      period: 0,
      periodType: '',
      maxDisbursement: 0,
      minDisbursement: 0,
      minPledge: 0,
      maxPledge: 0,
      trend_plus_minus: 0
    }
  },
  created: function () {
    let me = this
    me.queryCurrentCoinPrice()
    me.queryIndexLoanInfo()
  },
  methods: {
    goBack () {
      goBack()
    },
    queryCurrentCoinPrice () {
      let me = this
      queryCurrentCoinPrice(function (currentCoinPrice) {
        me.usd_price = currentCoinPrice.usdPrice
        me.trend = (currentCoinPrice.trend * 100).toFixed(2)

        let date = currentCoinPrice.priceUpdatedTime
        me.updated_time = date.substr(0, 5)

        if (currentCoinPrice.trend < 0) {
          me.up_or_down = -1
          me.trend_plus_minus = -1
        } else if (currentCoinPrice.trend > 0) {
          me.up_or_down = 1
          me.trend_plus_minus = 1
        }
      })
    },
    queryIndexLoanInfo () {
      let me = this
      queryIndexLoanInfo(function (indexLoanInfo) {
        me.maxAmount = indexLoanInfo.maxAmount / 1000000
        me.minAmount = indexLoanInfo.minAmount / 1000000
        me.period = indexLoanInfo.period
        let periodType = indexLoanInfo.periodType
        if (periodType === 10) {
          me.periodType = '天'
        } else if (periodType === 20) {
          me.periodType = '月'
        } else if (periodType === 30) {
          me.periodType = '年'
        } else {
          me.periodType = ''
        }
        me.maxDisbursement = indexLoanInfo.maxDisbursement / 100
        me.minDisbursement = indexLoanInfo.minDisbursement / 100
        me.minPledge = indexLoanInfo.minPledge.toFixed(2)
        me.maxPledge = indexLoanInfo.maxPledge.toFixed(2)
      })
    }
  }
}
</script>

<style>
.banner {
  width: 100%;
  display: flex;
  justify-content: center;
}

.banner-item {
  width: 345px;
  height: 222px;
  background: url(../../assets/images/banner_lending_@2x.png) no-repeat right top;
  background-size: 100% 100%;
}

.btc-price {
  width: 100%;
  padding-top: 30px;
  background-color: #f2f5fb;
}

.real-time {
  text-align: center;
  font-size: 15px;
  color:#444f5c;
}

.source {
  margin-top: 8px;
  text-align: center;
  font-size: 11px;
  color:#aeaeae;
}

.price-trend {
  margin-top: 14.5px;
  text-align: center;
}

.trend-icon {
  padding: 0 9.5px;
}

.trend-icon img {
  width: 15px;
  height: 12px;
}

.price {
  font-size: 28px;
  color:#24272b;
}

.trend {
  font-size: 13px;
  color:#24272b;
}

.borrow {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f2f5fb;
  margin-bottom: 50px;
}

.borrow-list {
  width: 345px;
  margin-top: 25px;
  border-top: #b3bfd0 1px solid;
  border-bottom: #b3bfd0 1px solid;
}

.borrow-item {
  height: 45px;
  line-height: 45px;
  border-top: #b3bfd0 1px dotted;
}

.borrow-item-left {
  float: left;
  width: 50%;
  color: #737c86;
  font-size: 15px;
  padding-left: 10px;
}

.borrow-item-right {
  float: right;
  width: 50%;
  text-align: right;
  color: #24272b;
  font-size: 15px;
  padding-right: 10px;
}
</style>
