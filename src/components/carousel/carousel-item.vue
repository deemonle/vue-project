<template>
  <span 
  class="el-carousel__item"
  :class="{
    'is-active': moveIn,
    'is-in': moveOut
  }"
  :style="{
    msTransform: `translateX(${ translate }px)`,
    webkitTransform: `translateX(${ translate }px)`,
    transform: `translateX(${ translate }px)`,
  }"
  ref="item">
    <span v-show="moveIn || moveOut" >
      <slot></slot>
    </span>
  </span>
</template>

<script>
export default {
  name: 'DmCarouselItem',
  data () {
    return {
      moveIn:false,
      moveOut:false,
      translate: 0,
      scale: 1,
    }
  },
  
  methods: {
    showItem (index, activeIndex, oldIndex) {
      let direction = this.$parent.direction
      let activePosition = this.$parent.getIndexPosition(activeIndex)
      let oldPosition = this.$parent.getIndexPosition(oldIndex)
      let translateWidth = this.$parent.translateWidth
      let offsetIndex = index - activeIndex
      this.moveIn = index === activeIndex
      this.moveOut = index === oldIndex
      if(this.moveOut){
        this.translate = (activePosition >= oldPosition) ? -translateWidth : translateWidth;
      }else if(this.moveIn){
        this.translate = 0
      }else {
        // debugger//
        if(index === activeIndex + 1 || offsetIndex === -(this.$parent.items.length - 1)){
          this.translate = translateWidth
        }else if(index === activeIndex - 1 || offsetIndex === this.$parent.items.length - 1){
          this.translate = -translateWidth
        }
        else{
          this.translate = direction ? translateWidth : -translateWidth
        }
      }
    }
  }
}
</script>

<style scoped>
.el-carousel__item {
  /* position: absolute; */
	-webkit-transition:-webkit-transform .3s;
	transition:-webkit-transform .3s;
	transition:transform .3s;
	transition:transform .3s,-webkit-transform .3s;
}
.is-active{
  z-index: 2
}
.is-in{
  z-index: 1
}
</style>
