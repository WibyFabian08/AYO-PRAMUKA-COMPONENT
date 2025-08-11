import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

// css external library
import 'vue3-emoji-picker/css'

const myApp = createApp(App)

myApp.mount('#app')
