<template>
  <a @click="handleClick" :href="href" class="test">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'AnchorItem',

  inject: ['anchor'],

  props: {
    title: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      showPosition: Number
    }
  },

  methods: {
    handleClick () {
      this.$emit('on-click')
      this.$nextTick(() => window.location.href = this.anchor.currentLink)
    }
  },

  computed: {
  },

  mounted () {
    this.showPosition = this.$parent.startPosition
  }
}
</script>

<style scoped>
.test{
  margin-top: 20px;
}
</style>
