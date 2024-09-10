import { ref, onMounted, } from 'vue';
import axios from 'axios';

export function useTaskToday() {
	const tasksToday = ref([]);
	const loadingTaskToday = ref(true);
	const errorTaskToday = ref(null);

	const fetchData = async () => {
		try {
			const response = await axios.get('https://1c95d6dd92be91a6.mokky.dev/timeLimitTask');
			tasksToday.value = response.data;
		} catch (err) {
			errorTaskToday.value = err.message;
			console.log(errorTaskToday.value);
		} finally {
			loadingTaskToday.value = false;
		}
	}

	const fetchTaskTodayById = async (taskId) => {
		try {
			const response = await axios.get(`https://1c95d6dd92be91a6.mokky.dev/timeLimitTask/${taskId}`);
			return response.data;
		} catch (err) {
			console.error(err);
			return null;
		}
	};
	onMounted(fetchData)

	return {
		tasksToday,
		loadingTaskToday,
		errorTaskToday,
		fetchData,
		fetchTaskTodayById,
	};
}