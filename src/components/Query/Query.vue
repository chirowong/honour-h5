<template>
  <Header title="查询">
    <el-row class="box-card" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
      <el-col :span="12">
        <div class="grid-content chinese-name">燃气热水器</div>
        <div class="grid-content eng-name">Water heater</div>
        <div class="grid-content grid-query"><el-button size="mini" class="query-btn">查询</el-button></div>
      </el-col>
      <el-col :span="12">
        <img src="../../assets/logo.png" class="image">
      </el-col>
    </el-row>
  </Header>
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
  .el-header {
    background-color: #4EB0D7;
    color: #fff;
    text-align: center;
    line-height: 44pt;
    font-size: 17px;
    font-weight: bold;
  }

  .title {
    text-align: center;
  }

  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .box-card {
    height: 130px;
    background-color: #f4f4f8;
    margin-bottom: 20px;
    border-radius: 10px;
  }

  .box-card .image {
    width: 130px;
    height: 130px;
  }

  .grid-content {
    min-height: 25px;
  }

  .box-card .chinese-name {
    margin-top: 30px;
    font-size: 17px;
    font-weight: bold;
    text-align: left;
    padding-left: 24px;
  }

  .box-card .eng-name {
    font-size: 10px;
    text-align: left;
    padding-left: 24px;
  }

  .box-card .grid-query {
    text-align: left;
    padding-left: 24px;
  }

  .box-card .query-btn {
    background-color: #4EB0D7;
    color: #fff;
  }
</style>
