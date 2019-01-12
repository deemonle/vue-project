<template>
  <div>
    <mo-button 
    @click="handleClick" 
    icon="iconfont icon-info-circle">
      button
    </mo-button>
  </div>
</template>

<script>
import MoButton from './button.vue'
export default {
  name: '',

  components: {
    MoButton
  },

  props: {
  },

  data () {
    return {
    }
  },

  methods: {
    handleClick() {
      console.log('sss')
    }
  },

  computed: {
  },

}
</script>

<style scoped lang="stylus">

</style>
