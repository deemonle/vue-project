<template>
  <span>
    <span ref="link">
      <slot></slot>
    </span>
    <i v-if="separatorClass">{{separatorClass}}</i>
    <span v-else>{{separator}}</span>
  </span>
</template>

<script>
export default {
  data () {
    return {
      separator: '',
      separatorClass: ''
    }
  },
  mounted () {
    this.separator = this.$parent.separator
    this.separatorClass = this.$parent.separatorClass
  }
}
</script>

<style scoped>

</style>
