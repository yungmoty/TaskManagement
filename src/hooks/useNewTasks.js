import { ref, onMounted, } from 'vue';
import axios from 'axios';

export function useNewTasks() {
	const newTasks = ref([]);
	const loadingTask = ref(true);
	const errorNewTasks = ref(null);
	const fetchData = async () => {
		try {
			const response = await axios.get('https://1c95d6dd92be91a6.mokky.dev/newTasks');
			newTasks.value = response.data;
		} catch (err) {
			errorNewTasks.value = err.message;
			console.log(errorNewTasks.value);
		} finally {
			loadingTask.value = false;
		}
	}
	onMounted(fetchData)
	return {
		newTasks,
		loadingTask,
		errorNewTasks,
	}
}
