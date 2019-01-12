// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import '@/assets/iconfont/test/iconfont.css'
// import BScroll from 'better-scroll'
import { hooks } from 'vue-hooks'

import 'element-ui/lib/theme-chalk/index.css'
import { 
  Button, 
  Select, 
  Tabs,
  TabPane,
  Collapse,
  CollapseItem,
  Carousel,
  CarouselItem
} from 'element-ui';
Vue.use(Button)
Vue.use(Select)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(hooks)
// Vue.use(BScroll)

Vue.prototype.$axios = axios;
// Vue.prototype.$BScroll = BScroll;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
