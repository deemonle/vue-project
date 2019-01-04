import Vue from 'vue'
import Router from 'vue-router'
// import Carousel from '@/components/carousel/test'
import Tab from '@/components/tab/test'
// import Anchor from '@/components/anchor/test'
import Dropdown from '@/components/dropdown/test'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Carousel',
    //   component: Carousel
    // },
    {
      path: '/',
      name: 'Tab',
      component: Tab
    },
    // {
    //   path: '/',
    //   name: 'Dropdown',
    //   component: Dropdown
    // },
  ]
})