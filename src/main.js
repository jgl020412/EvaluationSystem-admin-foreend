import './assets/main.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from '@/router'
import App from './App.vue'
import {createPinia} from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import locale from 'element-plus/dist/locale/zh-cn.js'

import UserMng from '@/views/UserMng.vue'
import ServiceMng from '@/views/ServiceMng.vue'
import EvaluationMng from '@/views/EvaluationMng.vue'
import Analysis from '@/views/Analysis.vue'

const app = createApp(App);
const pinia = createPinia();
const persist = createPersistedState();
pinia.use(persist)
app.use(pinia)
app.use(router)
app.use(ElementPlus,{locale});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('user-mng', UserMng)
app.component('service-mng', ServiceMng)
app.component('evaluation-mng', EvaluationMng)
app.component('analysis', Analysis)
app.mount('#app')
