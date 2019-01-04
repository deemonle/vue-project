<template>
  <div
  @mouseenter="pauseTimer"
  @mouseleave="startTimer">
    <div class="carousel"
    >
      <button v-show="isActive" class="left" @click="handleClickSubtract()">left</button>
      <button v-show="isActive" class="right" @click="handleClickAdd()">right</button>
    </div>
    <slot></slot>
    <div class="dmCarouselIndicator">
      <span
      v-for="(item, index) in items" 
      :key="index"
      @click="handleClickIndicator(index)">
        <button>{{index}}</button>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DmCarousel',

  props: {
    initialIndex: {
      type: String,
    },
    autoTime: String,
    activeItem:　String,
  },
  data () {
    return {
      isActive: false,
      items: [],
      translateWidth:0,
      itemPosition: [],
      activeIndex: parseInt(this.activeItem) || 0,
      activePosition: 0,
      oldIndex: 0,
      defalutAutoTime: 2000,
      timer: null,
      oldIndex:0,
      direction: true, //true: right false:left
    }
  },
  
  methods: {
    
    handleClickAdd () {
      this.direction = true
      this.oldIndex = this.activeIndex

      if(this.activeIndex < this.items.length - 1){
        this.activeIndex = this.activeIndex + 1
      }else{
        this.activeIndex = 0
      }

      this.activePosition = this.getIndexPosition(this.activeIndex)
      this.transformItem()
    },
    handleClickSubtract () {
      this.direction = false
      this.oldIndex = this.activeIndex

      if(this.activeIndex === 0){
        this.activeIndex = this.items.length - 1
      }else{
        this.activeIndex = this.activeIndex - 1
      }

      this.activePosition = this.getIndexPosition(this.activeIndex)   
      this.transformItem()
    },
    handleClickIndicator (index) {
      if(this.activeIndex === index) return     
      let offsetIndex = index - this.activeIndex
      if(offsetIndex === 1 || offsetIndex === -(this.items.length - 1)){
        return this.handleClickAdd()
      }else if(offsetIndex === -1 || offsetIndex === this.items.length - 1){
        return this.handleClickSubtract()
      }
      this.activePosition = this.getIndexPosition(index)
      this.oldIndex = this.activeIndex
      this.activeIndex = index      
      this.transformItem()
    },
    startTimer () {
      this.isActive = false
      this.timer = setInterval(
        this.handleClickAdd, this.autoTime || this.defalutAutoTime)
    },
    pauseTimer () {
      this.isActive = true
      clearInterval(this.timer)
    },
    getFirstOldIndex () {
      if(this.oldIndex === this.activeIndex) {
        this.oldIndex = (this.activeIndex === 0) ? this.items.length - 1 : this.activeIndex - 1
      }
    },
    transformItem () {
      this.items.forEach((item, index) => {
        item.showItem(index, this.activeIndex, this.oldIndex)
      });
    },
    getInitIndex(index){
    },
    getIndexPosition (index) {
      this.itemPosition = []
      this.items.forEach((item, index) => {
        this.itemPosition.push(item.$refs.item.getBoundingClientRect().left)
      })
      return this.itemPosition[index]
    }
  },

  mounted () {
    this.items = this.$children.filter(child => child.$options.name === 'DmCarouselItem');
    this.getFirstOldIndex()
    this.getIndexPosition()
    this.translateWidth = this.$el.offsetWidth
    this.transformItem()
    this.startTimer()
  },
}
</script>
  
<style scoped>
  .carousel{
    position: absolute;
    width: 200px;
    top:45px;
    display: flex;
    justify-content: space-between;
    z-index: 10
  }

  .carousel .left{
    position: relative;
    left: 10px
  }
  .carousel .right{
    position: relative;
    right: 10px
  }

  .dmCarouselIndicator{
    width: 200px;
    position: absolute;
    justify-content: center;
    display: flex;
    z-index: 10;
    bottom: 10px
  }
</style>
