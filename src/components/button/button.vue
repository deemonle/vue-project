<style scoped lang="stylus">
  button
    padding: 10px;
    border-radius: 6px;
    border-color: #eeeeee;
    background: white;
    min-height: 25px;
    width: 100px;
    &:hover
      border-color: #2d8cf0
</style>

<template>
  <button @click="hanleClick">

  </button>
</template>

<script>
export default {
  name: 'dm-button',

  props: {
  },

  data () {
    return {
    }
  },

  methods: {
    hanleClick () {
      this.$emit('change11', event)
    }
  },

  computed: {
  },

  created () {
    console.log('混入对象')
  }
}
</script>
