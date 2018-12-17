<template>
  <Header title="首页" has-back="false">
      <el-row class="box-card" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
          <el-col :span="12">
            <div class="grid-content chinese-name">燃气热水器</div>
            <div class="grid-content eng-name">Water heater</div>
            <div class="grid-content grid-query"><el-button size="mini" class="query-btn" @click='goQuery'>查询</el-button></div>
          </el-col>
          <el-col :span="12">
            <img src="../../assets/logo.png" class="image">
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
  methods: {
    goQuery () {
      this.$router.push({path: '/query'})
    }
  }
}
</script>

<style>
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
