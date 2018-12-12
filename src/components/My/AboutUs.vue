<template>
  <div id='main' style="background-color: #f2f5fb;">
    <!-- 头部 -->
    <Header title="关于我们"></Header>
    <div id="container">
    </div>
    <dl class="Bit_icon">
      <dt><img src="../../assets/images/ic_my_headpic2_@2x.png"/></dt>
      <dd class="dd1">Bit</dd>
      <dd>v5.4.4920.1</dd>
    </dl>
  </div>
</template>

<script>
import { goBack } from '../../assets/js/common'

export default {
  methods: {
    goBack () {
      goBack()
    }
  }
}
</script>

<style type="text/less" lang='less' scoped>
  #floater {
    float: left;
    height: 50%;
    margin-bottom: -120px;
  }

  #content {
    clear: both;
    height: 240px;
    position: relative;
  }
  .Bit_icon{
    text-align: center;
    font-size: 12px;
    color: #999;
    line-height: 24px;
    padding-top: 80px;
  }
  .Bit_icon dt img{
    display: block;
    width: 70px;
    height: auto;
    margin: 0 auto;
  }
  .Bit_icon .dd1{
    font-size: 15px;
    color: #333;
    margin-top: 20px;
  }
</style>
