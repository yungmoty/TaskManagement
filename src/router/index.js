import { createRouter, createWebHistory } from 'vue-router'
import OverviewPage from '@/pages/OverviewPage.vue'
import TaskPage from '@/pages/TaskPage.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
		path: '/',
		component: OverviewPage,
		},
		{
		path: '/task',
		component: TaskPage,
		},
	]
})

export default router
