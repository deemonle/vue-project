<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'anchor',

  provide () {
    return {
      anchor: this
    }
  },

  props: {
    showPosition: {
      type: Number,
      default: 50
    }
  },

  data () {
    return {
      items: [],
      startPosition: this.showPosition,
      currentLink: window.location.href
    }
  },

  methods: {
  },

  computed: {
  },

  mounted () {
    this.$on('on-click',() => {
      console.log('1')
    })
    this.items = this.$children.filter(child => child.$options.name = "AnchorItem")
  }
}
</script>

<style scoped>

</style>
