<template>
  <SearchHeader title="搜索">
    <el-row class="hot-search">
      <el-col :span="24">
        <el-row>
          <el-col :span="24">
            <div class="grid-content hot-search-title">热门搜索</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content query-box-tag-list">
              <el-tag class="query-box-tag">标签一</el-tag>
              <el-tag class="query-box-tag-select">标签二</el-tag>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </SearchHeader>
</template>

<script>
import {queryCurrentCoinPrice} from '../../api/currentCoinPrice'

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
  .hot-search {
    height: 130px;
    background-color: #4EB0D7;
  }

  .grid-content {
    min-height: 25px;
  }

  .hot-search .hot-search-title {
    margin-top: 23px;
    font-size: 17px;
    color: #fff;
    text-align: left;
    padding-left: 24px;
  }

  .hot-search .query-box-tag-list {
    margin-top: 10px;
    font-size: 18px;
    color: #fff;
    text-align: left;
    padding-left: 24px
  }

  .hot-search .query-box-tag {
    font-size: 13px;
    color: #fff;
    border-color: #fff;
    border-radius: 20px;
    height: 20px;
    line-height: 20px;
  }

  .hot-search .query-box-tag-select {
    font-size: 13px;
    color: #4EB0D7;
    background-color: #ffffff;
    border-color: #fff;
    border-radius: 20px;
    height: 20px;
    line-height: 20px;
  }
</style>
