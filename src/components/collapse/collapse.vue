<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Array],
    },
    accordion: {
      type: Boolean,
      defalut () {
        return false
      }
    }
  },

  data () {
    return {
      activeNames: this.value === null ? [] : [].concat(this.value)
    }
  },

  methods: {
    getActiveNames (item) {
      let index = this.activeNames.indexOf(item)
      if (index > -1) {
        this.activeNames.splice(index,1)
        return this.activeNames[0]
      }else{
        this.activeNames.unshift(item)
      }

      if (this.accordion) {
        this.activeNames = [].concat(this.activeNames[0])
      }
    },
    handleClick(name){
      this.getActiveNames(name)
      console.log('collapse:' + this.activeNames)
    } 
  },
  
  created () {
    this.$on('item-click', this.handleClick)//获取点击事件和传入的点击事件名字
  }
}
</script>

<style scoped>

</style>
