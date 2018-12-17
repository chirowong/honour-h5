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
</style>
