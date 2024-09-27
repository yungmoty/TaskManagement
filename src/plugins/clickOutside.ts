import { App } from 'vue';
import clickOutside from '@/directives/clickOutside';

export default {
	install(app: App) {
		app.directive('click-outside', clickOutside);
	}
};