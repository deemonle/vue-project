<template>
  <div >
    <mo-picker
    v-show="active"
    :data="column"
    :selectedIndex= "[1, 2]"
    @select="getPickeData"
    @change="getPickeData"
    ></mo-picker>
    <button class="button" @click="handleClick">{{active}}</button>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import MoPicker from './picker.vue'
export default {
  name: '',

  components: {
    MoPicker
  },

  props: {
  },

  data () {
    return {
      column: [
        [{text: 'a',value: 'a'},{text: 'b',value: 'b'},{text: 'c',value: 'c'},{text: 'd',value: 'd'}],
        [{text: 'a',value: 'a'},{text: 'e',value: 'e'},{text: 'f',value: 'f'},{text: 'g',value: 'g'}]
      ],
      active: true
    }
  },

  methods: {
    getPickeData(array) {
      console.log(array)
    },
    // handleClick() {
    //   this.column = [
    //     [{text: 'b',value: 'b'},{text: 'c',value: 'c'},{text: 'd',value: 'd'}],
    //     // [{text: 'a',value: 'a'},{text: 'e',value: 'e'},{text: 'f',value: 'f'},{text: 'g',value: 'g'}]
    //   ]
    // }
    handleClick() {
      if(this.active)
        this.active = false
      else
        this.active = true
    }
  },

  computed: {
  },

  mounted() {
    // console.log(this.column)
    this.$nextTick(() => {
        // let bscrollDom = this.$refs.bscroll;
        // this.aBScroll = new BScroll(bscrollDom,{
        //   // click: true
        // })
    })   
}

}
</script>

<style scoped lang="stylus">
  .bscroll{
    width: 100%;
    height: 50px;
    overflow: hidden;
}
  .button
    position absolute
    top 200px

</style>
