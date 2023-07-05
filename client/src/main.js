import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//vue-router
import router from './router'
//pinia
import { createPinia } from 'pinia'


const vuetify = createVuetify({
  components,
  directives,
})
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(vuetify)
app.use(router)
app.mount('#app')

