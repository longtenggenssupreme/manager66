// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mybread from '@/components/common/cuscom/mybread.vue'
import moment from 'moment'
import AxiosPlugin from '@/plugins/AxiosPlugin.js'
Vue.use(AxiosPlugin)
Vue.config.productionTip = false
Vue.component(Mybread.name, Mybread)
Vue.filter('fmtdatetime', (v) => {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
