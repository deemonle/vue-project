<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    separator: {
      trpe: String,
      default: '/'
    },
    separatorClass: {
      trpe: String,
      default: '/'
    }
  },
  mounted () {
    const items = this.$el.querySelectorAll('span')
    console.log(items)
  }
}
</script>

<style scoped>

</style>
