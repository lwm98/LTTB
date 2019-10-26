import Vue from 'vue'
import router from '../router/indexRouter'
import indexApp from '../components/indexApp.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#index',
  router,
  components: { indexApp },
  template: '<indexApp/>'
})
