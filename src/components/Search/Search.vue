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
