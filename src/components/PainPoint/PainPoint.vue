<template>
  <Header title="常规痛点">
    <el-row class="query-box-card normal-paid">
      <el-col :span="12">
        <div class="grid-content query-box-title">产品常规痛点查询</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content query-box-icon"><i class="el-icon-arrow-right" @click='goBack'></i></div>
      </el-col>
    </el-row>
    <el-row class="query-box-card value-discovery">
      <el-col :span="12">
        <div class="grid-content query-box-title">产品高价值点发现</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content query-box-icon"><i class="el-icon-arrow-right" @click='goBack'></i></div>
      </el-col>
    </el-row>
    <el-row class="query-box-card custom-value">
      <el-col :span="12">
        <div class="grid-content query-box-title">自定义价值点查询 </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content query-box-icon"><i class="el-icon-arrow-right" @click='goBack'></i></div>
      </el-col>
    </el-row>
  </Header>
</template>

<script>
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
  },
  methods: {
  }
}
</script>

<style>
  .query-box-card {
    height: 110px;
    margin-bottom: 20px;
    border-radius: 10px;
  }

  .normal-paid {
    background: url(../../assets/images/pain_point@2x.png) no-repeat right top;
    background-size: 100% 100%;
  }

  .value-discovery {
    background: url(../../assets/images/value_discovery@2x.png) no-repeat right top;
    background-size: 100% 100%;
  }

  .custom-value {
    background: url(../../assets/images/custom_value@2x.png) no-repeat right top;
    background-size: 100% 100%;
  }

  .grid-content {
    min-height: 25px;
  }

  .query-box-card .query-box-title {
    margin-top: 45px;
    font-size: 17px;
    color: #fff;
    text-align: left;
    padding-left: 24px;
  }

  .query-box-card .query-box-icon {
    margin-top: 45px;
    font-size: 18px;
    color: #fff;
    text-align: right;
    padding-right: 24px
  }
</style>
