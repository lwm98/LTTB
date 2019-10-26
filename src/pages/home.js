import Vue from 'vue'
import router from '../router/homeRouter'
import homeApp from '../components/homeApp'
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#home',
  router,
  components: { homeApp },
  template: '<homeApp/>'
})
