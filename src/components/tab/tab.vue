<template>
  <div class="tab">
    <div class="tabnav">
      <span @click="handleClick(tab.name)" v-for="tab in tabs" :key="tab.name">{{tab.label}}</span>
    </div>
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
      this.tabs = this.$children.filter(child => child.$options.name === 'MoTabPane');
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
  .tab
    min-height 100% 
    display flex
    flex-direction column
  .tabnav
    order 1
    height 30px
    display flex
    flex-direction row
    justify-content space-around
    align-items center
</style>

