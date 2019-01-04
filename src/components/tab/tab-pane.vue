<template>
  <div 
  v-show="isActive"
  class="tabpane"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MoTabPane',
  
  props: {
    label: String,
    name: String,
  },
  
  computed: {
    isActive () {
      return this.$parent.activeName === this.name
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
  .tabpane
    order 0
    min-height 100%
</style>
