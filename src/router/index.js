import { createRouter, createWebHistory } from 'vue-router'

//导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'
import Center from '@/views/Center.vue'
import UserMngVue from '@/views/UserMng.vue'
import ServiceMngVue from  '@/views/ServiceMng.vue'
import EvaluationMngVue from '@/views/EvaluationMng.vue'
import AnalysisVue from '@/views/Analysis.vue'

//定义路由关系
const routes = [
    { path: '/login', component: LoginVue },
    { path: '/center', component: Center },
    { path: '/center/userMng', component: UserMngVue },
    { path: '/center/serviceMng', component: ServiceMngVue },
    { path: '/center/evaluationMng', component: EvaluationMngVue },
    { path: '/center/analysis', component: AnalysisVue}
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

//导出路由
export default router