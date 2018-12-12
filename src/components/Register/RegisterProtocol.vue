  <template>
  <div id='main'>
    <Header title="注册服务与隐私授权协议"></Header>

    <div id="container">
    </div>
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
</style>
