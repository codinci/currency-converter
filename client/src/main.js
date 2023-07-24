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

import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

const globalOptions = {
  mode: 'auto',
};

const vuetify = createVuetify({
  components,
  directives,
})
const pinia = createPinia()
const app = createApp(App)

app.use(VueTelInput, globalOptions)
app.use(pinia)
app.use(vuetify)
app.use(router)
app.mount('#app')

