<template>
  <div class="container" v-show="isActive">
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
        return []
      },
    },
    active: {
      type: Boolean,
      default() {
        return false
      },
    },
  },

  data () {
    return {
      dataLength: this.data.length,
      wheels: [],
      pickerValue: [],
      pickerText: [],
      pickerIndex: this.selectedIndex || []
    }
  },

  methods: {
    //index is the wheelIndex
    initBScroll(wheel, index) {
      const BSWheel = new BScroll(wheel, {
        wheel: {
          selectedIndex: this.pickerIndex[index],
          wheelWrapperClass: 'wheel-scroll',
          wheelItemClass: 'wheel-item'
        },
        probeType: 3,
      })
      return BSWheel
    },
    //index is the wheelIndex
    getDispatchData(wheel, index) {
      this.pickerIndex[index] = wheel.getSelectedIndex()
      const {pickerValue,pickerText,pickerIndex} = this
      pickerValue[index] = this.data[index][pickerIndex[index]].value
      pickerText[index] = this.data[index][pickerIndex[index]].text
      return [pickerValue, pickerIndex, pickerText]
    },
    //index is the wheelIndex
    dispatchData(wheel, index) {
      //if you don't remove this 'on event', it will be 'on event' repeated 
      //when you call this function, you can also destroy the better-scroll 
      //instantiation to aviod 'on event' repeated
      wheel.on('scrollEnd',() => {
        const oldIndex = this.pickerIndex[index]
        const dispatchArray = this.getDispatchData(wheel, index)
        if(oldIndex != this.pickerIndex[index]){
          this.$emit('change',dispatchArray)
        }
        this.$emit('select',dispatchArray)
      })
    },
    getWheels() {
      this.$refs.wrapper.forEach((wheelWrapper, index) => {
        const wheel = this.initBScroll(wheelWrapper, index)
        this.getDispatchData(wheel, index)
        this.dispatchData(wheel, index)
        this.wheels[index] = wheel
      })
    },
    destroyWheels() {
      this.wheels && this.wheels.forEach(wheel => {
        wheel.destroy()
      })
        this.wheels = []
    },
    defNextTick() {
      this.$nextTick(() => {
        this.getWheels()
        this.$emit('select',[this.pickerValue,this.pickerIndex,this.pickerText])
      })
    }
  },

  computed: {
    isActive() {
      if(this.active){
        if(this.dataLength !== this.data.length){
          this.dataLength = this.data.length
          this.destroyWheels()
          this.defNextTick()
        }else{
          this.defNextTick()
        }
      }else{
        this.destroyWheels()
      }
      return this.active
    },
  },
  mounted() {
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
