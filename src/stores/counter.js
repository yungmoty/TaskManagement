import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMyStore = defineStore('myStore', () => {
	const isTrue = ref(false);


	function toggleValue() {
		isTrue.value = !isTrue.value;
	}

	return { isTrue, toggleValue };
});
