// directives/clickOutside.js
function handleClickOutside(event, el, binding) {
	if (!el.contains(event.target) && binding.value) {
		binding.value(event);
	}
}

	export default {
	beforeMount(el, binding) {
		const handler = (event) => handleClickOutside(event, el, binding);
		el.__clickOutsideHandler__ = handler;
		document.addEventListener('click', handler);
	},
	unmounted(el) {
		document.removeEventListener('click', el.__clickOutsideHandler__);
		delete el.__clickOutsideHandler__;
	}
};