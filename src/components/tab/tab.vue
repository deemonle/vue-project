<template>
  <div class="tab">
    <div class="tabnav" ref="tabnav" :style="tabNavStyle">
      <span 
      class="tabnav-item"
      @click.stop="handleClick(tab.name, index)" 
      v-for="(tab, index) in tabs" 
      :key="index"
      ref="tabNavItem">
        <i :class="tab.icon"></i>
        {{tab.label}} 
      </span>
    </div>
    <div class="borderstyle" :style="[borderSliderStyle, borderStyle]"></div>
    <div class="tab-panes-container" ref="tabPanes" :style="tabPanesStyle">
      <div class="tab-panes-slider" :style="panesSliderStyle">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoTab',

  props: {
    value: {
      type: String,
      required: true
    },
    borderStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    transition: {
      type: Boolean,
      default () {
        return true
      }
    },
    scroll: {
      type: Boolean,
      default () {
        return true
      }
    },
    tabNavStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    tabPanesStyle: {
      type: Object,
      default () {
        return {}
      }
    },//and $children 
    tabPaneStyle: {
      type: Object,
      default () {
        return {}
      }
    },//and $children 
  },

  data () {
    return {
      tabs: [],
      activeName: this.value,
      activeIndex: 0,
      borderLeft: Number,
      borderWidth: 0,
      transitionTime: String,
      paneWidth: Number
    }
  },

  methods: {
    getTabs () {
      this.tabs = this.$children.filter(child => child.$options.name === 'MoTabPane');
    },
    handleClick (name, index) {
      this.activeName = name
      this.activeIndex = index
      this.getBorderLeft(index)
      this.getBorderWidth(index)
      this.transitionTime = '0.3s'
      this.$emit('click', event)
    },
    getBorderLeft (index) {
      this.borderLeft = this.$refs.tabNavItem[index].getBoundingClientRect().left
    },
    getBorderWidth (index) {
      this.borderWidth = this.$refs.tabNavItem[index].getBoundingClientRect().width
    },
    getPaneWidth () {
      this.paneWidth = this.$refs.tabPanes.getBoundingClientRect().width
    },
    getInitIndex (activeName) {
      this.tabs.forEach((tab, index) => {
        if(tab.name === activeName){
          this.activeIndex = index
        }
      })
    },
    translateStyle (translate) {
      const translateX = `translateX(${translate}px)`
      return {
        transform: translateX,
        webkitTransform: translateX,
        msTransform: translateX,
      }
    }
  },

  computed:{
    borderSliderStyle () {
      let style = {}
      style = this.translateStyle(this.borderLeft)
      style.width = this.borderWidth + 'px'
      if(this.transition === false)
        return style
      style.webkitTransition = `-webkit-transform ${this.transitionTime},` + ` width ${this.transitionTime}`
      style.mozTransition = `-moz-transform ${this.transitionTime},` + ` width ${this.transitionTime}`
      style.transition = `transform ${this.transitionTime},` + ` width ${this.transitionTime}`
      return style
    },
    panesSliderStyle () {
      let style = {}
      style = this.translateStyle(-this.activeIndex * this.paneWidth)
      style.width = this.tabs.length * this.paneWidth + 'px'
      if(this.transition === false)
        return style
      style.webkitTransition = `-webkit-transform ${this.transitionTime}`
      style.mozTransition = `-moz-transform ${this.transitionTime}`
      style.transition = `transform ${this.transitionTime}`
      return style
    }
  },

  mounted () {
    this.getTabs ()
    this.getInitIndex(this.activeName)
    this.$nextTick(() => {
      this.getBorderLeft(this.activeIndex)
      this.getBorderWidth(this.activeIndex)
      this.getPaneWidth()
    })
  }
}
</script>



<style lang="stylus" scoped>
  .tab
    height 100%
    width 100%
    display flex
    flex-direction column
    .tabnav
      height 60px
      width 100%
      position absolute
      background white
      flex-shrink 0
      display flex
      justify-content space-around
      align-items center
      .tabnav-item
        display flex
        flex-direction column
        align-items center
    .borderstyle
      top 60px
      position: absolute
      background pink//覆盖内部样式
      height: 2px
      flex-shrink 0
    .tab-panes-container
      position absolute
      top 62px
      left 0
      right 0
      bottom 0
      overflow hidden
      .tab-panes-slider
        height 100%
        position absolute
        display flex
        flex-direction row
        //tab-pane
</style>
