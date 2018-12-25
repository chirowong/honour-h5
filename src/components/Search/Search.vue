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
      <div class="search-contain">
        <el-row class="search-count">
          <el-col :span="24">
            共发布1000条评论
          </el-col>
        </el-row>
        <ContentCard
          title="美的:JSQ25-G2"
          period="周期Y18W04"
          commentDate="2018.05.05"
          resource="信息来源:https://item.jd.com/5115632.html"
          content="价格匹配质量这个价格与这个质量匹配，用着还行1。噪音比较大，因为用料不足，料薄，因此热交换器（燃烧室）燃烧时共振声也就比较大。所"
          link="全文"
        ></ContentCard>
        <ContentCard
          title="美的:JSQ25-G3"
          period="周期Y18W04"
          commentDate="2018.05.06"
          resource="信息来源:https://item.jd.com/5115631.html"
          content="价格匹配质量这个价格与这个质量匹配，<span style='color:#EF8237'>用着还行。噪音比较大，因为用料不足，料薄，</span>因此热交换器（燃烧室）燃烧时共振声也就比较大。所"
          link="全文"
          ></ContentCard>
      </div>
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
  .search-contain {
    padding: 20px;
  }
  .search-count {
    text-align: left;
  }
</style>
