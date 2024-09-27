import { createApp } from 'vue'
import { createPinia } from 'pinia'
import components from '@/components/UI'
import clickOutsidePlugin from './plugins/clickOutside';
import { createI18n } from 'vue-i18n'
import App from '@/App.vue'
import router from '@/router'
import { languages, defaultLocale } from '@/i18n';

interface Languages {
	[key: string]: Record<string, string>;
}

const app = createApp(App)

const localeStorageLang: string | null = localStorage.getItem('lang')
const messages: Languages = Object.assign(languages)
const i18n = createI18n({
	legacy: false,
	fallbackLocale: 'en',
	locale: localeStorageLang || defaultLocale,
	messages,
})

app
	.use(createPinia())
	.use(router)
	.use(components)
	.use(clickOutsidePlugin)
	.use(i18n)
	.mount('#app')

