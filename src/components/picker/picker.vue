<template>
  <div class="container">
    <div class="mask-top"></div>
    <div class="picker-container">
      <div class="wheel-wrapper" 
      v-for="(item,index) in data" 
      :key="index" 
      ref="wrapper">
        <ul class="wheel-scroll">
          <li v-for="(item, index) in item"
          class="wheel-item" 
          :key="index"
          >{{item.value}}</li>
        </ul>
      </div>
    </div>
    <div class="mask-bottom"></div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'MoPicker',

  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    selectedIndex: {
      type: Array,
      default() {
        return 0
      },
    },
  },

  data () {
    return {
      wheels: [],
      pickerValue: [],
      pickerText: [],
      pickerIndex: this.selectedIndex || []
    }
  },

  methods: {
    getPickerdata() {
      this.data.forEach((wheelData,index) => {
        this.pickerValue[index] = wheelData[this.pickerIndex[index]].value
        this.pickerText[index] = wheelData[this.pickerIndex[index]].text
      })
    },
    genDispatchData(wheel, index) {
      this.pickerIndex[index] = wheel.getSelectedIndex()
      this.getPickerdata()
    },
    getPickerIndex(wheel, index) {
      this.pickerIndex[index] = wheel.getSelectedIndex()
    },
    getWheels() {
      if (!this.$refs.wrapper) {
        return
      }
      this.$refs.wrapper.forEach((wheelWrapper, index) => {
        const wheel = new BScroll(wheelWrapper, {
          wheel: {
            selectedIndex: this.selectedIndex[index],
            wheelWrapperClass: 'wheel-scroll',
            wheelItemClass: 'wheel-item'
          },
          probeType: 3,
        })
        this.wheels[index] = wheel
        this.genDispatchData(wheel, index)
        wheel.on('scrollEnd',() => {
          let oldIndex = this.pickerIndex[index]
          this.genDispatchData(wheel, index)
          if(oldIndex != this.pickerIndex[index]){
            this.$emit('change',this.pickerValue,this.pickerIndex,this.pickerText)
          }
          this.$emit('select',this.pickerValue,this.pickerIndex,this.pickerText)
        })
      })
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.getWheels()
      this.$emit('select',this.pickerValue,this.pickerIndex,this.pickerText)
    })
  },

  beforeDestroy() {
    this.wheels && this.wheels.forEach((wheel) => {
      wheel.destroy()
    })
    this.wheels = null
  },
}
</script>

<style scoped lang="stylus">
  .container
    display flex
    justify-content center
    align-items center
    overflow hidden
    position absolute
    height 150px  //Easily modified
    width 100%
    border 1px solid #eeeeee  //common
    .mask-top, .mask-bottom
      z-index 10
      width 100%
      height 60px   //modified
      pointer-events none
    .mask-top
      border-bottom 1px solid #eeeeee //common
      position absolute
      top 0
      background linear-gradient(to top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.8))
    .mask-bottom
      border-top 1px solid #eeeeee  //common
      position absolute
      bottom 0
      background linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.8))
    .picker-container
      display flex
      justify-content center
      width 100%
      height 100%
      .wheel-wrapper
        width 100%
        height 100%
        .wheel-scroll
          width 100%
          list-style none
          margin-top 60px    //modified
          .wheel-item
            width 100%
            display flex
            justify-content center
            align-items center
            font-size 20px  //modified
            height 30px     //modified
    //wheel-item:height = container:height - (mask-top:height + mask-top:height)
</style>
