// directives/clickOutside.ts
import { DirectiveBinding } from 'vue';

function handleClickOutside(event: MouseEvent, el: HTMLElement, binding: DirectiveBinding) {
	if (!el.contains(event.target as Node) && binding.value) {
		binding.value(event);
	}
}

export default {
	beforeMount(el: HTMLElement, binding: DirectiveBinding) {
		const handler = (event: MouseEvent) => handleClickOutside(event, el, binding);
		el.__clickOutsideHandler__ = handler;
		document.addEventListener('click', handler);
	},
	unmounted(el: HTMLElement) {
		document.removeEventListener('click', el.__clickOutsideHandler__);
		delete el.__clickOutsideHandler__;
	}
};
