<template>
    <!-- 头部 -->
    <div id='header'>
      <div class="navbar">
        <ul>
          <li @click='goBack'><span><img src="../../assets/images/ic_back_white_@2x.png"/></span></li>
          <li><span>{{title}}</span></li>
        </ul>
      </div>
    </div>
</template>

<script>
import { goBack } from '../../assets/js/common'

export default {
  name: 'Header',
  props: {
    title: String
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
