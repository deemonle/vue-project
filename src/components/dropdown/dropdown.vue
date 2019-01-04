<template>
  <div 
  @mouseenter="handleMouseEnter()"
  @mouseleave="handleMouseLeave()">
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
      isActive: {
        type: Boolean,
        default: false
      }
    }
  },

  methods: {
    handleMouseEnter () {
      this.isActive = true 
    },
    handleMouseLeave () {
      this.isActive = false
    }
  },

  computed: {
  },

}
</script>

<style scoped lang="scss">

</style>
