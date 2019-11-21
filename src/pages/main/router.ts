import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/index',
    name: 'index',
    component: () => import('./components/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
