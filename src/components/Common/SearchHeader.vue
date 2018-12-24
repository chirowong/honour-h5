<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="2">
          <i class="el-icon-arrow-left" @click='goBack' v-if="!hasBack"></i>
        </el-col>
        <el-col :span="19" class="search-box">
          <el-input
          size="small"
          placeholder="请输入关键字"
          v-model="searchContent">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        </el-col>
        <el-col :span="3" class="title">{{title}}</el-col>
      </el-row>
    </el-header>
    <el-main class="search-main">
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
    </el-main>
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script>
import { goBack } from '../../assets/js/common'

export default {
  data () {
    return {
      searchContent: ''
    }
  },
  name: 'SearchHeader',
  props: {
    title: String,
    hasBack: Boolean
  },
  methods: {
    goBack () {
      goBack()
    }
  }
}
</script>

<style>
  .el-header {
    background-color: #4EB0D7;
    color: #fff;
    text-align: center;
    line-height: 44pt;
    font-size: 17px;
    font-weight: bold;
  }

  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
  }

  .search-main {
    padding: 0;
  }

  body > .el-container {
    margin-bottom: 10px;
  }

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
