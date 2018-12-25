<template>
  <Header title="产品高价值趋势">
    <el-row>
      <el-col :span="24">
        <Tabs value="name1">
          <TabPane label="18W47" name="name1">标签一的内容</TabPane>
          <TabPane label="近四周" name="name2">标签二的内容</TabPane>
          <TabPane label="近八周" name="name3">标签三的内容</TabPane>
          <TabPane label="本年累计" name="name4">标签三的内容</TabPane>
        </Tabs>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="trend-split">
      </el-col>
    </el-row>
    <div class="trend-contain">
    <ContentCard
      title="美的:JSQ25-G3"
      period="周期Y18W04"
      point="0.812"
      commentDate="2018.05.06"
      resource="信息来源:https://item.jd.com/5115631.html"
      content="价格匹配质量这个价格与这个质量匹配，<span style='color:#EF8237'>用着还行。噪音比较大，因为用料不足，料薄，</span>因此热交换器（燃烧室）燃烧时共振声也就比较大。所"
      link="全文"
    ></ContentCard>
    </div>
  </Header>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style>
  .ivu-tabs-nav .ivu-tabs-tab {
    padding: 10px 15px;
  }

  .trend-contain {
    padding: 0 20px;
  }
  .trend-split{
    background-color: #F1F1F1;
    height: 10px;
  }
</style>
