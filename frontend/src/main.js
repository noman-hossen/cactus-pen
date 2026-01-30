import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Create the app
const app = createApp(App)

// Use Pinia
const pinia = createPinia()
app.use(pinia)

// Mount the app
app.mount('#app')