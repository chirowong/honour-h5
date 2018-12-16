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
