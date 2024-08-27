import UButton from "@/components/UI/UButton.vue"
import UInput from '@/components/UI/UInput.vue';
import UMiniButton from '@/components/UI/UMiniButton.vue';
import USelect from '@/components/UI/USelect.vue';

const components = [
	{name: 'UButton', component: UButton},
	{name: 'UInput', component: UInput},
	{name: 'UMiniButton', component: UMiniButton},
	{name: 'USelect', component: USelect},
]

export default {
	install(app) {
		components.forEach(({name, component}) => {
			app.component(name, component)
		})
	}
}