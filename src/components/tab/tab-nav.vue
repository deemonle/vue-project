<template>
  <div class="">
    <span @click="handleClick(tab.name)" v-for="tab in tabs" :key="tab.name">{{tab.label}}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    position: String
  },
  data () {
    return {
      tabs: [],
      activeName: this.value
    }
  },
  methods: {
    getTabs () {
      this.tabs = this.$children.filter(child => child.$options.name === 'DmTabPane');
    },
    handleClick (name) {
      this.activeName = name
    }
  },
  mounted () {
    this.getTabs ()
  },
}
</script>

<style lang="stylus" scoped>

</style>

