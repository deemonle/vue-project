<template>
  <div >
    <Anchor>
      <AnchorItem href="#tab1" title="first">
        tab1
      </AnchorItem>
      <AnchorItem href="#tab2" title="second">
        tab2
      </AnchorItem>
      <AnchorItem href="#tab3" title="third">
        tab3
      </AnchorItem>
      <AnchorItem href="#tab4" title="forth">
        tab4
      </AnchorItem>
      <AnchorItem href="#tab1">a</AnchorItem>
      <div class="test">
      <a id="tab1">
        tab1内容
        tab1内容<br>
        tab1内容<br>
        tab1内容<br>
        tab1内容<br>
        tab1内容<br>
        tab1内容<br>
        tab1内容<br>
        tab1内容<br>
      </a>
      <AnchorItem href="#tab2">a</AnchorItem>
      <a name="tab2">
        tab2内容
        tab2内容<br>
        tab2内容<br>
        tab2内容<br>
        tab2内容<br>
        tab2内容<br>
        tab2内容<br>
        tab2内容<br>
        tab2内容<br>
        tab2内容<br>
      </a>      
      <a name="tab3">
        tab3内容
        tab3内容<br>
        tab3内容<br>
        tab3内容<br>
        tab3内容<br>
        tab3内容<br>
        tab3内容<br>
        tab3内容<br>
        tab3内容<br>
      </a>
      <a name="tab4">
        tab4内容
        tab4内容<br>
        tab4内容<br>
        tab4内容<br>
        tab4内容<br>
        tab4内容<br>
        tab4内容<br>
        tab4内容<br>
        tab4内容<br>
      </a>
    </div>
    </Anchor>
  </div>
</template>

<script>
import AnchorItem from './anchor-item.js'
import Anchor from './anchor.js'

export default {
  components: {
    AnchorItem,
    Anchor
  },
  data () {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style scoped>
  .box{
    position: absolute;
    height: 100px;
    width: 100%;
    background: aquamarine;
    z-index: -1
  }
  .test{
    /* height: 100px; */
    overflow: scroll;
    height: 300px;
    margin: 20px;
    top: 100px;
    position: relative;
    /* overflow: scroll; */
  }
</style>
