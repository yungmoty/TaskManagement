import { createRouter, createWebHistory } from 'vue-router'
import OverviewPage from '@/pages/OverviewPage.vue'
import TaskPage from '@/pages/TaskPage.vue'
import DetailTaskPage from '@/pages/DetailTaskPage.vue'
import RegistrationPage from '@/pages/RegistrationPage.vue'
import MentorsPage from '@/pages/MentorsPage.vue'
import MessagePage from '@/pages/MessagePage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: RegistrationPage,
		},
		{
			path: '/overview',
			component: OverviewPage,
		},
		{
			path: '/task',
			component: TaskPage,
		},
		{
			path: '/task-detail/:id',
			name: 'task-detail',
			component: DetailTaskPage,
			props: true
		},
		{
			path: '/mentors',
			component: MentorsPage,
		},
		{
			path: '/message',
			component: MessagePage,
		},
		{
			path: '/settings',
			component: SettingsPage,
		},
	]
})

export default router
