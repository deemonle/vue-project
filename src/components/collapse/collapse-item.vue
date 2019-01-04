<template>
  <div>
    <div @click="handleClick">{{ title }}</div>
    <div v-show="isActive">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DmCollapseItem',

  data () {
    return {
      // value: this.$parent.activeNames,
      // isActive: this.$parent.activeNames.indexOf(this.name) > -1,
    }
  },

  props: {
    title: {
      type: String
    },
    //当前item的name
    name: {
      type: String
    }
  },

  methods: {
    handleClick () { 
      this.$parent.$emit('item-click',this.name)
      // this.value = this.$parent.activeNames //data里面value的值不会响应式刷新 ？？？
    }
  },

  computed: {
    isActive () {
      return this.$parent.activeNames.indexOf(this.name) > -1 ? true :false
    }
  }
  // watch: {
  //   value:function () {
  //     //此处this.$parent.activeNames不能换位this.value
  //     this.isActive = this.$parent.activeNames.indexOf(this.name) > -1 ? true :false
  //   },
  // }
}
</script>

<style scoped>

</style>
