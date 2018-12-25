<template>
  <Header title="查询">
    <div class="query-contain">
    <el-row class="query-box-card pain-point" @click.native='goPainPoint'>
      <el-col :span="12">
        <div class="grid-content query-box-title">产品常规痛点查询</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content query-box-icon"><i class="el-icon-arrow-right"></i></div>
      </el-col>
    </el-row>
    <el-row class="query-box-card value-discovery" @click.native='goHighValue'>
      <el-col :span="12">
        <div class="grid-content query-box-title">产品高价值点发现</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content query-box-icon"><i class="el-icon-arrow-right"></i></div>
      </el-col>
    </el-row>
    <el-row class="query-box-card custom-value" @click.native='goSearch'>
      <el-col :span="12">
        <div class="grid-content query-box-title">自定义价值点查询</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content query-box-icon"><i class="el-icon-arrow-right"></i></div>
      </el-col>
    </el-row>
    </div>
  </Header>
</template>

<script>
export default {
  methods: {
    goPainPoint () {
      this.$router.push({path: '/painPoint'})
    },
    goHighValue () {
      this.$router.push({path: '/highValue'})
    },
    goSearch () {
      this.$router.push({path: '/search'})
    }
  }
}
</script>

<style>
  .query-contain {
    padding: 20px;
  }

  .query-box-card {
    height: 110px;
    margin-bottom: 20px;
    border-radius: 10px;
  }

  .pain-point {
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
