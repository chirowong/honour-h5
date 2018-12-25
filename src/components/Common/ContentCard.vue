<template>
  <el-card class="content-card" bodyStyle="padding: 10px 20px; text-align: left">
    <el-row>
      <el-col :span="12" class="content-card-title">
        {{title}}
      </el-col>
      <el-col :span="12" class="content-card-point">
        <template v-if="point">评分:{{point}}</template>
      </el-col>
    </el-row>
    <el-row v-if="totalComment">
      <el-col :span="24" class="content-card-total-comment">
        共发布{{totalComment}}条评论
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7" class="content-card-period">
        {{period}}
      </el-col>
      <el-col :span="12" class="content-card-period">
        评论日期：{{commentDate}}
      </el-col>
      <el-col :span="5" class="content-card-trend">
        <el-button class="show-trend-button" v-if="isShowTrend" @click='goTrend' size="mini">查看趋势</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="content-card-resource">
        {{resource}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="content-card-content" v-html="content"></el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="content-card-link">
        {{link}}
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'ContentCard',
  props: {
    title: String,
    point: String,
    totalComment: String,
    isShowTrend: Boolean,
    trend: String,
    trendId: String,
    period: String,
    commentDate: String,
    resource: String,
    content: String,
    link: String
  },
  methods: {
    goTrend () {
      this.$router.push({path: '/trend'})
      console.log('dsfsdf' + this.trend)
    }
  }
}
</script>

<style>
  .content-card {
    margin: 15px 0;
  }

  .content-card-title{
    color: #333333;
    font-size: 18px;
    margin-top: 15px;
  }

  .content-card-point{
    color: #4EB0D7;
    font-size: 15px;
    font-weight: bold;
    margin-top: 15px;
    text-align: right;
  }

  .content-card-total-comment {
    color: #666666;
    font-size: 11px;
    margin-top: 7px;
    text-align: right;
  }

  .content-card-period{
    color: #666666;
    font-size: 12px;
    margin-top: 27px;
  }

  .content-card-trend{
    color: #666666;
    font-size: 12px;
    margin-top: 20px;
    text-align: right;
  }

  .show-trend-button {
    color: #fff;
    border-radius: 5px;
    background-color: #4EB0D7;
    border-color: #4EB0D7;
    padding: 5px 10px;
  }

  .show-trend-button:focus, .show-trend-button:hover {
    color: #fff;
    border-color: #4EB0D7;
    background-color: #4EB0D7;
  }

  .content-card-resource{
    color: #BFBFBF;
    font-size: 11px;
    margin-top: 16px;
  }

  .content-card-content{
    color: #333333;
    font-size: 12px;
    line-height: 20px;
    margin-top: 8px;
  }

  .content-card-link{
    color: #4EB0D7;
    font-size: 12px;
    text-align: right;
  }
</style>
