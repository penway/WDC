import { createApp } from 'vue'
import * as VueRouter from "vue-router"
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';

import InterManager from "./components/inter/InterManager.vue"
import MainPart from "./components/StageList.vue"

// routes
const routes = [
    { path: "/", component: MainPart },
    { path: "/interchangeable", component: InterManager },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
