import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)  // Asegúrate de que el enrutador esté vinculado a la app
  .mount('#app')

