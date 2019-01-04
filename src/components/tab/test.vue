<template>
<div class="test">
  <mo-tab v-model="activeName">
    <mo-tab-pane label="tab1" name="first">tab1内容</mo-tab-pane>
    <mo-tab-pane label="tab2" name="second">tab2内容</mo-tab-pane>
    <mo-tab-pane label="tab3" name="third">tab3内容</mo-tab-pane>
    <mo-tab-pane label="tab4" name="forth">tab4内容</mo-tab-pane>
  </mo-tab>
  </div>
</template>

<script>
import MoTabPane from './tab-pane.vue'
import MoTabNav from './tab-nav.vue'
import MoTab from './tab.vue'
export default {
  components: {
    MoTabPane,
    MoTabNav,
    MoTab
  },
  data () {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style scoped>
  .test{
    height: 200px
  }
</style>
