<template>
  <Header title="常规痛点">
    <dev class="box_but_list">
      <div class="brand_but">品牌<span class="triangle-down"></span><div class="shu"></div></div>
      <div class="cycle_but">周期</div>
    </dev>
    <div class="box_label_list">
      <span>全部品牌</span>
      <span>近四周</span>
    </div>
    <div class="content_list">
      <div class="cont">
        <div class="top">
          <div class="name">声音异响</div>
          <div class="num_but">共1000条 ></div>
        </div>
        <div class="bottom">
          <div class="name">全部品牌</div>
          <div class="ProgressBar"><div class="blue" style="width: 50%"></div></div>
          <div class="Number">1000</div>
        </div>
      </div>
      <div class="cont">
        <div class="top">
          <div class="name">声音异响</div>
          <div class="num_but">共1000条 ></div>
        </div>
        <div class="bottom">
          <div class="name">全部品牌</div>
          <div class="ProgressBar"><div class="blue" style="width: 50%"></div></div>
          <div class="Number">1000</div>
        </div>
      </div>
    </div>
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
  /*下拉框样式*/
  .box_but_list{
    display: block;
    width: 100%;
    height: 48px;
    line-height: 48px;
    border-bottom: 1px #f1f1f1 solid;
  }
  .box_but_list .brand_but,.cycle_but{
    position: relative;
    text-align: center;
    float: left;
    width: 50%;
    height: 48px;
    color: #333;
  }
  .box_but_list .brand_but .shu{
    width: 1px;
    height: 25px;
    background-color: #f1f1f1;
    position: absolute;
    right: 0;
    top: 11px;
  }
  /*已经选择的标签样式*/
  .box_label_list{
    text-align: left;
    padding: 12px 25px 24px;
  }
  .box_label_list span{
    display: inline-block;
    padding: 5px 8px;
    background-color: #efefef;
    color: #999;
    margin-right: 12px;
    border-radius: 4px;
  }
  /*内容*/
  .content_list{
    text-align: left;
    padding: 0 25px;
    min-height: 300px;
  }
  .content_list .cont{
    border-radius: 10px;
    padding: 0 10px;
    -moz-box-shadow:0px 1px 5px #e0e0e0;
    -webkit-box-shadow:0px 1px 5px #e0e0e0; box-shadow:0px 1px 5px #e0e0e0;
    margin-bottom: 22px;
  }
  .content_list .cont .top{
    height: 54px;
    line-height: 54px;
    border-bottom: 1px #f1f1f1 solid;
  }
  .content_list .cont .top .name{
    float: left;
    font-size: 20px;
    color: #333;
    font-weight: bold;
  }
  .content_list .cont .top .num_but{
    float: right;
    font-size: 14px;
    color: #666;
  }
  .content_list .cont .bottom{
    height: 40px;
    line-height: 40px;
  }
  .content_list .cont .bottom .name{
    float: left;
    color: #999;
    width: 22%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .content_list .cont .bottom .ProgressBar{
    float: left;
    background-color: #efefef;
    width: 64%;
    height: 6px;
    margin-top: 16px;
  }
  .content_list .cont .bottom .ProgressBar .blue{
    height: 6px;
    background-color: #44a7d1;
  }
  .content_list .cont .bottom .Number{
    float: right;
    text-align: right;
    color: #999;
    width: 14%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
