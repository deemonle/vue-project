<template>
  <div>
    <!-- <dm-collapse v-model="activeName" accordion>
      <div class="active">
      <dm-collapse-item title="title1" name='1'>
        11
        <dm-collapse v-model="activeName" accordion>
          <dm-collapse-item title="title2" name="5">22</dm-collapse-item>
          <dm-collapse-item title="title2" name="6">22</dm-collapse-item>
          <dm-collapse-item title="title2" name="7">22</dm-collapse-item>
          <dm-collapse-item title="title2" name="8">22</dm-collapse-item>
        </dm-collapse>
      </dm-collapse-item>
      <dm-collapse-item title="title2" name="2">22</dm-collapse-item>
      <dm-collapse-item title="title3" name="3">33</dm-collapse-item>
      <dm-collapse-item title="title4" name="4">33</dm-collapse-item>
      </div>
    </dm-collapse> -->
    <div>
      <dm-carousel  class="dmCarousel">
        <dm-carousel-item class="dmCarouselItem">
          <img src="@/assets/images/dog.jpg" width="200" height="120" alt="dog">
        </dm-carousel-item>
        <dm-carousel-item class="dmCarouselItem">
          <img src="@/assets/images/mao.jpg" width="200" height="120" alt="mao">
        </dm-carousel-item>
        <dm-carousel-item class="dmCarouselItem">
          <img src="@/assets/images/sheep.jpg" width="200" height="120" alt="sheep">
        </dm-carousel-item>
        <dm-carousel-item class="dmCarouselItem">
          <img src="@/assets/images/monkey.jpg" width="200" height="120" alt="monkey">
        </dm-carousel-item>
        <dm-carousel-item class="dmCarouselItem">
          <img src="@/assets/images/monkey.jpg" width="200" height="120" alt="monkey">
        </dm-carousel-item>
      </dm-carousel>
    </div>
  </div>
</template>

<script>
import DmCarousel from './carousel'
import DmCarouselItem from './carousel-item'

export default {
  components: {
    DmCarousel,
    DmCarouselItem,
  },
  data () {
    return {
      activeName: ['1', '2'],
    }
  }
}
</script>

<style scoped>
  .dmCarousel{
    left: 300px;
    position: relative;
    height: 120px;
    width: 200px;
    overflow: hidden;
  }
  .dmCarouselItem{
    width: 200px;
  }
  
</style>