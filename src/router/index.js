import { createMemoryHistory, createRouter } from 'vue-router'
const routes = [
  { 
    path: '/', 
    name: 'home', 
    component: () => import('../views/HomePage.vue') 
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router