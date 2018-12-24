<template>
  <el-card class="content-card" bodyStyle="padding: 10px 20px; text-align: left">
    <el-row>
      <el-col :span="24" class="content-card-title">
        {{title}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7" class="content-card-period">
        {{period}}
      </el-col>
      <el-col :span="17" class="content-card-period">
        评论日期：{{commentDate}}
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
    period: String,
    commentDate: String,
    resource: String,
    content: String,
    link: String
  }
}
</script>

<style>
  .content-card {
    margin: 15px 20px;
  }

  .content-card-title{
    color: #333333;
    font-size: 18px;
    margin-top: 15px;
  }

  .content-card-period{
    color: #666666;
    font-size: 12px;
    margin-top: 27px;
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
