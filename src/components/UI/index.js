import UButton from "@/components/UI/UButton.vue"
import UInput from '@/components/UI/UInput.vue';
import UMiniButton from '@/components/UI/UMiniButton.vue';
import UHeaderSelect from '@/components/UI/UHeaderSelect.vue';
import UChart from '@/components/UI/UChart.vue';

const components = [
	{name: 'UButton', component: UButton},
	{name: 'UInput', component: UInput},
	{name: 'UMiniButton', component: UMiniButton},
	{name: 'UHeaderSelect', component: UHeaderSelect},
	{name: 'UChart', component: UChart},
]

export default {
	install(app) {
		components.forEach(({name, component}) => {
			app.component(name, component)
		})
	}
}