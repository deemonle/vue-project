<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',

  props: {
  },

  data () {
    return {
      // isActive: {
      //   type: Boolean,
      //   default: false
      // }
    }
  },

  methods: {
  },

  computed: {
    isActive () {
      return this.$parent.isActive
    }
  },

}
</script>

<style scoped lang="scss">

</style>
