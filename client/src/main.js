import { createApp } from 'vue'
import { createRouter, createWebHashHistory} from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import Login from './components/Login.vue'
import Workbench from '@/components/Workbench.vue'


export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: Login },
        { path: '/main', component: Workbench },
    ]
});

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
