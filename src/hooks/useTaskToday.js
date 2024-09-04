import { ref, onMounted, } from 'vue';
import axios from 'axios';

export function useTaskToday() {
	const taskToday = ref([]);
	const loadingTaskToday = ref(true);
	const errorTaskToday = ref(null);
	const fetchData = async () => {
		try {
			const response = await axios.get('https://1c95d6dd92be91a6.mokky.dev/timeLimitTask');
			taskToday.value = response.data;
		} catch (err) {
			errorTaskToday.value = err.message;
			console.log(errorTaskToday.value);
		} finally {
			loadingTaskToday.value = false;
		}
	}

	onMounted(fetchData)
	return {
		taskToday,
		loadingTaskToday,
		errorTaskToday,
		fetchData,
	}
}