<template>
  <div>
    <mo-picker
    :active="active"
    :data="column"
    :selectedIndex="selectId"
    @select="onSelect"
    ></mo-picker>
    <button class="button" @click="handleClick">{{active}}</button>
    <button class="button2" @click="addWheel">{{active}}</button>
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
      active: false,
      selectId: [1, 2]//当你需要改变column的长度时，selectedIndex也应改变
    }
  },

  methods: {
    addWheel(array) {
      this.column.push([{text: 'aaaaa',value: 'aaaaa'},{text: 'e',value: 'e'},{text: 'f',value: 'f'},{text: 'g',value: 'g'}])
      this.selectId.push(1)
    },
    // handleClick() {
    //   this.column = [
    //     [{text: 'b',value: 'b'},{text: 'c',value: 'c'},{text: 'd',value: 'd'}],
    //     // [{text: 'a',value: 'a'},{text: 'e',value: 'e'},{text: 'f',value: 'f'},{text: 'g',value: 'g'}]
    //   ]
    // }
    onSelect() {
      console.log("test")
    },
    handleClick() {
      if(this.active){
        this.active = false
      }
      else{
        this.active = true
      }
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
  .button2
    position absolute
    top 250px

</style>
