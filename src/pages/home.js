import Vue from 'vue'
import router from '../router/homeRouter'
import homeApp from '../components/homeApp'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#home',
  router,
  components: { homeApp },
  template: '<homeApp/>'
})
