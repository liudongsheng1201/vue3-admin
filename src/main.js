import './styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'

import App from './App.vue'
import router from './router'

import '@/mock/index'
import 'github-markdown-css/github-markdown.css'

import '@/permission'

import components from './components'
import directives from './directives'

const app = createApp(App)

app.use(createPinia()).use(router).use(naive).use(components).use(directives)

app.mount('#app')
