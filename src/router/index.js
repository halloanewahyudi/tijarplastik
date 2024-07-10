import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component:() => import('../views/HomePage.vue'),
      meta:{
        description:'menjual berbagaimacam plastik dan bahan kue'
      }
    },
    {
      path: '/product',
      name: 'Product',
      component:() => import('../views/ProductPage.vue')
    }
  ]
})

export default router
