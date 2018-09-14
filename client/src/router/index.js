import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Checkout from '@/components/checkout'
import Login from '@/components/login'
import AdminPanel from '@/components/adminPanel'
import store from '../store'

Vue.use(Router)

let router = new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/checkout', name: 'Checkout', component: Checkout },
    { path: '/login', name: 'Login', component: Login },
    { path: '/adminPanel', component: AdminPanel, meta: { requiresAuth: true } },
    { path: '/logout', beforeEnter (to, from, next) { store.dispatch('logout'); next('/') } }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(store.getters.isLoggedIn) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router