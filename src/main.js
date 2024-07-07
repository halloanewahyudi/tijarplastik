import { createApp } from 'vue'
import './style.css'
import router from'./router'
import { createPinia } from 'pinia'
import App from './App.vue'


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.config.globalProperties.$formatCurrency = function(value) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  }

app.mount('#app')
