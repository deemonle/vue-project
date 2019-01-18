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
import MoPicker from '../picker/picker.vue'
export default {
  name: 'MoDatePicker',

  mixins: [MoPicker],

  props: {
    startTime: {
      type: Array,
      default() {
        return [2015]
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
    this.data = [[{text: 'a',value: 'a'},{text: 'b',value: 'b'},{text: 'c',value: 'c'},{text: 'd',value: 'd'}],
        [{text: 'a',value: 'a'},{text: 'e',value: 'e'},{text: 'f',value: 'f'},{text: 'g',value: 'g'}]
        [{text: 'a',value: 'a'},{text: 'e',value: 'e'},{text: 'f',value: 'f'},{text: 'g',value: 'g'}]]
    // this.$on('select')
    // this.$nextTick(() => {
    //   console.log(this.defNextTick)
    // })
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
