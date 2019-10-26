import Vue from 'vue'
import router from '../router/indexRouter'
import indexApp from '../components/indexApp.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#index',
  router,
  components: { indexApp },
  template: '<indexApp/>'
})
