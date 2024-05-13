import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import ButtonComponent from './components/forms/ButtonComponent.vue'
import SelectComponent from './components/forms/SelectComponent.vue'
import TextInputComponent from './components/forms/TextInputComponent.vue'
import AlertComponent from './components/AlertComponent.vue'
import GlobalAlertComponent from './components/global/GlobalAlertComponent.vue'
import GlobalConfirmComponent from './components/global/GlobalConfirmComponent.vue'
import GlobalPasswordConfirmationComponent from './components/global/GlobalPasswordConfirmationComponent.vue'

import App from './App.vue'
import router from './router'

import './index.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(
  createPersistedState({
    key: (id) => `invuentory:${id}`,
    auto: true
  })
)

app.use(pinia)
app.use(router)

app
  .component('ButtonComponent', ButtonComponent)
  .component('SelectComponent', SelectComponent)
  .component('TextInputComponent', TextInputComponent)
  .component('AlertComponent', AlertComponent)
  .component('GlobalAlertComponent', GlobalAlertComponent)
  .component('GlobalConfirmComponent', GlobalConfirmComponent)
  .component('GlobalPasswordConfirmationComponent', GlobalPasswordConfirmationComponent)

app.mount('#app')
