<template>
  <button @click.stop="hanleClick">
    <i :class="icon"></i>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'mo-button',

  props: {
    icon: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: true
    },
  },

  data () {
    return {
    }
  },

  methods: {
    hanleClick (e) {
      if(!this.active){
        event.preventDefault()
        return 
      }
      this.$emit('click', event)
    }
  },
}
</script>

<style scoped lang="stylus">
  bg-color = #4a4c5b
  border = none
  color = white

  button
    outline none
    color color
    background bg-color
    border border
    border-radius 2px
    padding 10px
    min-height 25px
    width 6rem
</style>