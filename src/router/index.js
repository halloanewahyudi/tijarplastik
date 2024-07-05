import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component:() => import('../views/HomePage.vue')
    },
    {
      path: '/product',
      name: 'Product',
      component:() => import('../views/ProductPage.vue')
    },
    {
      path:'/detail/:id',
      name:'Detail',
      component:()=> import('../views/[...detail].vue')
    }
  ]
})

export default router
