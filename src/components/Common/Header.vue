<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="1">
          <i class="el-icon-arrow-left" @click='goBack' v-if="!hasBack"></i>
        </el-col>
        <el-col :span="22" class="title">{{title}}</el-col>
        <el-col :span="1"></el-col>
      </el-row>
    </el-header>
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script>
import { goBack } from '../../assets/js/common'

export default {
  name: 'Header',
  props: {
    title: String,
    hasBack: Boolean
  },
  created: function () {
    console.log(this.$route.query.statusBarHeight)
  },
  methods: {
    goBack () {
      goBack()
    }
  }
}
</script>
