<template>
  <Header title="高价值">
    <div class="hign-value-contain">
    <el-row>
      <el-col :span="24">
        <div class="grid-content query-box-title">产品常规痛点查询</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="high-value-tag-contain">
        <el-tag class="high-value-tag">全部品牌</el-tag>
        <el-tag class="high-value-tag">近4周</el-tag>
      </el-col>
    </el-row>
    <ContentCard
      title="美的:JSQ25-G3"
      period="周期Y18W04"
      point="0.812"
      totalComment="4"
      v-bind:isShowTrend=true
      commentDate="2018.05.06"
      resource="信息来源:https://item.jd.com/5115631.html"
      content="价格匹配质量这个价格与这个质量匹配，<span style='color:#EF8237'>用着还行。噪音比较大，因为用料不足，料薄，</span>因此热交换器（燃烧室）燃烧时共振声也就比较大。所"
      link="全文"
    ></ContentCard>

    <ContentCard
      title="美的:JSQ25-G3"
      period="周期Y18W04"
      point="0.812"
      totalComment="4"
      v-bind:isShowTrend=true
      trend="11"
      commentDate="2018.05.06"
      resource="信息来源:https://item.jd.com/5115631.html"
      content="价格匹配质量这个价格与这个质量匹配，<span style='color:#EF8237'>用着还行。噪音比较大，因为用料不足，料薄，</span>因此热交换器（燃烧室）燃烧时共振声也就比较大。所"
      link="全文"
    ></ContentCard>
    </div>
  </Header>
</template>

<script>
import {queryCurrentCoinPrice} from '../../api/currentCoinPrice'
import {queryIndexLoanInfo} from '../../api/home'

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
  .hign-value-contain {
    padding: 20px;
  }

  .high-value-tag-contain {
    text-align: left;
  }

  .high-value-tag-contain .high-value-tag {
    font-size: 11px;
    color: #707070;
    border-color: #fff;
    border-radius: 3px;
    height: 20px;
    line-height: 20px;
    background-color: #F1F1F1;
  }
</style>
