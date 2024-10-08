import UButton from "@/components/UI/UButton.vue"
import UInput from '@/components/UI/UInput.vue';
import UMiniButton from '@/components/UI/UMiniButton.vue';
import UHeaderSelect from '@/components/UI/UHeaderSelect.vue';
import UOverviewPageSlideMentor from '@/components/UI/UOverviewPageSlideMentor.vue';
import UOverviewPageSlideTask from '@/components/UI/UOverviewPageSlideTask.vue';
import UOverviewPageTaskToday from '@/components/UI/UOverviewPageTaskToday.vue';
import USubmitBtn from '@/components/UI/USubmitBtn.vue';
import USelect from '@/components/UI/USelect.vue';

const components = [
	{name: 'UButton', component: UButton},
	{name: 'UInput', component: UInput},
	{name: 'UMiniButton', component: UMiniButton},
	{name: 'UHeaderSelect', component: UHeaderSelect},
	{name: 'UOverviewPageSlideMentor', component: UOverviewPageSlideMentor},
	{name: 'UOverviewPageSlideTask', component: UOverviewPageSlideTask},
	{name: 'UOverviewPageTaskToday', component: UOverviewPageTaskToday},
	{name: 'USubmitBtn', component: USubmitBtn},
	{name: 'USelect', component: USelect},
]

export default {
	install(app) {
		components.forEach(({name, component}) => {
			app.component(name, component)
		})
	}
}