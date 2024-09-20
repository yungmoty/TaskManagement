import clickOutside from '@/directives/clickOutside';

export default {
	install(app) {
		app.directive('click-outside', clickOutside);
	}
};