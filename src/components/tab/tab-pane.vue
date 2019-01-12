<template>
    <div 
    class="tabpane"
    :style="tabPaneStyle"
    ref="tabpane"
    >
      <div>
        <slot></slot>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'MoTabPane',
  
  props: {
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      tabPaneStyle: this.$parent.tabPaneStyle,
    }
  },

  computed: {
    isActive () {
      return this.$parent.activeName === this.name
    }
  },
  mounted() {
    if(this.$parent.scroll){
      this.$nextTick(() => {
        const scroll = new BScroll(this.$refs.tabpane)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .tabpane
    width 100%
    // padding 20px
    // position relative
</style>
