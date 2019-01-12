<template>
  <Header title="痛点详情">
    <div class="box_but_list">
      <div class="brand_but" @click="brandBut">
        <span class="triangle-down" :class="{'current':brandPopup}">品牌</span>
        <div class="shu"></div>
      </div>
      <div class="cycle_but" @click="cycleBut">
        <span class="triangle-down" :class="{'current':cyclePopup}">周期</span>
      </div>
    </div>
    <div class="box_label_list">
      <span v-for="item in brandCurrent" :key="item.id">{{item}}</span>
      <span v-if="cycleCurrent !== ''">{{cycleCurrent}}</span>
    </div>
    <div class="titleBox">声音异响
      <div class="Number">共发布1000条评论</div>
    </div>
    <div class="hign-value-contain">
      <ContentCard
        title="美的:JSQ25-G3"
        period="周期Y18W04"
        commentDate="2018.05.06"
        resource="信息来源:https://item.jd.com/5115631.html"
        content="价格匹配质量这个价格与这个质量匹配，<span style='color:#EF8237'>用着还行。噪音比较大，因为用料不足，料薄，</span>因此热交换器（燃烧室）燃烧时共振声也就比较大。所"
        link="全文"
      ></ContentCard>
    </div>
    <div class="overlay" v-if="overlay"></div>
    <div class="brand_popup" v-if="brandPopup">
      <ul>
        <li v-for="item in brandArr" :key="item.id" @click="selectSort(item)" :class="{'current':item.show===true}">
          {{item.name}}
        </li>
      </ul>
      <div class="button_box">
        <div class="button ResetButton" @click="ResetButton">重置</div>
        <div class="button ConfirmButton" @click="ConfirmButton">确定</div>
      </div>
    </div>
    <div  class="cycle_popup" v-if="cyclePopup">
      <ul>
        <li v-for="item in cycleArr" :key="item.id" @click="cycleSort(item)">
          {{item}}
        </li>
      </ul>
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
      trend_plus_minus: 0,
      brandPopup: false,
      overlay: false,
      select: '',
      brandArr: [
        { name: '全部品牌', show: false },
        { name: 'AO史密斯', show: false },
        { name: '能率', show: false },
        { name: '林内', show: false }
      ],
      brandCurrent: [],
      cyclePopup: false,
      cycleArr: [ '今天', '近四周', '近八周', '本年累计' ],
      cycleCurrent: '',
      labelArr: []
    }
  },
  created: function () {
  },
  methods: {
    brandBut () {
      this.cyclePopup = false
      this.brandPopup = !this.brandPopup
      if (this.brandPopup === true) {
        this.overlay = true
      } else {
        this.overlay = false
      }
    },
    selectSort (item) {
      item.show = !item.show
    },
    ConfirmButton () {
      this.brandPopup = !this.brandPopup
      this.overlay = !this.overlay
      let Arr = this.brandArr
      let brandCurrent = []
      for (let i in Arr) {
        if (Arr[i].show === true) {
          brandCurrent.push(Arr[i].name)
        }
      }
      this.brandCurrent = brandCurrent
    },
    ResetButton () {
      let Arr = this.brandArr
      for (let i in Arr) {
        Arr[i].show = false
      }
    },
    cycleBut () {
      this.brandPopup = false
      this.cyclePopup = !this.cyclePopup
      if (this.cyclePopup === true) {
        this.overlay = true
      } else {
        this.overlay = false
      }
    },
    cycleSort (item) {
      this.cyclePopup = !this.cyclePopup
      if (this.cyclePopup === true) {
        this.overlay = true
      } else {
        this.overlay = false
      }
      this.cycleCurrent = item
    }
  }
}
</script>

<style>
  .titleBox{
    padding:0 20px;
    font-size: 26px;
    color: #333;
    font-weight: bold;
    text-align: left;
  }
  .titleBox .Number{
    font-size: 14px;
    color: #999;
    margin-top: 12px;
  }
  .hign-value-contain {
    padding:0 20px;
  }
  /*下拉框样式*/
  .box_but_list{
    display: block;
    width: 100%;
    height: 48px;
    line-height: 48px;
    border-bottom: 1px #f1f1f1 solid;
    font-size: 14px;
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
  .box_but_list span{
    padding-right: 24px;
  }
  .box_but_list .triangle-down{
    background-image: url("../../assets/images/triangle-down.png");
    background-size: 10px 6px;
    background-repeat: no-repeat;
    background-position: right;
  }
  .box_but_list .current{
    color: #44a7d1;
    background-image: url("../../assets/images/triangle-up.png");
    background-size: 10px 6px;
    background-repeat: no-repeat;
    background-position: right;
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
  /*下拉弹窗*/
  .brand_popup{
    width: 100%;
    background-color: #FFF;
    position: absolute;
    top: 108px;
    left: 0;
    z-index: 2;
  }
  .brand_popup ul{
    padding: 0 38px;
    text-align: left;
    font-size: 14px;
    color: #666;
  }
  .brand_popup ul li{
    height: 48px;
    line-height: 48px;
    border-bottom: #f8f8f8 solid 1px;
    background-image: url("../../assets/images/select_icon.png");
    background-repeat: no-repeat;
    background-size: 22px 22px;
    background-position: right;
  }
  .brand_popup ul li.current{
    background-image: url("../../assets/images/select_icon1.png");
  }
  .brand_popup ul li:last-child{
    border-bottom: none;
  }
  .brand_popup .button_box{
    width: 100%;
    height: 56px;
    line-height: 56px;
  }
  .brand_popup .button_box .button{
    width: 50%;
    height: 56px;
    float: left;
    background-color: #efefef;
    color: #b9b9b9;
    font-size: 18px;
  }
  .brand_popup .button_box .ConfirmButton{
    background-color: #44a7d1;
    color: #fff;
  }
  .overlay{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    left: 0;
    top: 108px;
    z-index: 1;
  }
  .cycle_popup{
    width: 100%;
    background-color: #FFF;
    position: absolute;
    top: 108px;
    left: 0;
    z-index: 2;
  }
  .cycle_popup ul{
    padding: 0 38px;
    text-align: left;
    font-size: 14px;
    color: #666;
  }
  .cycle_popup ul li{
    height: 48px;
    line-height: 48px;
    border-bottom: #f8f8f8 solid 1px;
  }
  .cycle_popup ul li:last-child{
    border-bottom: none;
  }
</style>
