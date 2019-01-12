<template>
  <div class="container">
    <!-- <div class="picker-border" ref="wrapper">
      <ul class="slider">
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
      </ul>
    </div> -->
    <mo-bscroll class="mo-picker-border">
      <ul class="mo-picker-slider">
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
      </ul>
    </mo-bscroll>
  </div>
</template>

<script>
import MoBscroll from '../bscroll/bscroll.vue'

export default {
  name: 'MoPicker',

  components: {
    MoBscroll
  },

  props: {
    height: {
      type: String,
      defalut() {
        return '20px'//20px common
      }
    }
  },

  data () {
    return {
    }
  },

  methods: {
  },

  computed: {
  },

  mounted() {
    this.$nextTick(() => {
        // this.scroll = new Bscroll(this.$refs.wrapper, {})
      })
  }
}
</script>

<style scoped lang="stylus">
  .container
    display flex
    justify-content center
    align-items center
    overflow hidden
    position absolute
    top 100px
    height 200px
    width 100%
    background #eeeeee
    .mo-picker-border
      width 100%
      height 20px
      border 1px solid red
    .mo-picker-border
      width 100%
      height 20px
      border 1px solid red
</style>
