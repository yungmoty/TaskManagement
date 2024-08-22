// import '@/assets/scss/main.scss'
import '@/assets/scss/common/variables.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import components from '@/components/UI'
import directives from '@/directives'

import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)

app
	.use(createPinia())
	.use(router)
	.use(components)
	.use(directives)
	.mount('#app')

