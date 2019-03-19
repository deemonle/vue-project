<template>
  <div>
    <mo-date-picker
    @select="onSelect"
    >
    </mo-date-picker>
  </div>
</template>

<script>
import MoDatePicker from './datePicker.vue'
export default {
  components: {
    MoDatePicker
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
    onSelect(date) {
      console.log(date)
    },
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

</style>
