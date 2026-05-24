import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuth } from '@/stores/useAuth'

import App from './App.vue'
import router from './router'

import './images/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
const authStore = useAuth()

// Initialize authentication state on app startup
authStore.initAuth().then(() => {
  app.mount('#app')
})
