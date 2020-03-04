import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Login from '@/components/login.vue'
import Home from '@/components/common/Home.vue'
import Test from '@/components/Test/test.vue'
Vue.use(ElementUI)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [{
        path: '/test',
        name: 'test',
        component: Test
      }]
    }
    // ,
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: Test
    // }
  ]
})
