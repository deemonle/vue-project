<template>
<div class="test">
  <mo-tab 
  v-model="activeName" 
  transition
  :scroll="true">
    <!-- <i slot="first" class="iconfont  icon-info-circle"></i> -->
    <mo-tab-pane label="tab1" name="first" icon="iconfont  icon-info-circle">
      <div v-for="item in 50" :key="item">
          <div>tab1内容</div>
      </div>
    </mo-tab-pane>
    <mo-tab-pane label="tab2aa" name="second" icon="iconfont  icon-info-circle">
      <div  class="tabpanes"  ref="tabpanes">
        <div v-for="item in 50" :key="item">
            tab2内容
        </div>
      </div>
    </mo-tab-pane>
    <mo-tab-pane label="tab3" name="third" icon="iconfont  icon-info-circle">tab3内容</mo-tab-pane>
  </mo-tab>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import MoTabPane from './tab-pane.vue'
import MoTab from './tab.vue'
export default {
  components: {
    MoTabPane,
    MoTab
  },
  data () {
    return {
      activeName: 'first',
    }
  },
  mounted() {
    
  }
}
//transition   optional     default true   
//activeName   absolutely   name

//event   'click'
</script>

<style scoped>
  .test{
    height: 500px;
  }
</style>
