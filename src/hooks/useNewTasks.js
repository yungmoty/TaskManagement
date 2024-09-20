import { ref, onMounted, } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n'

export function useNewTasks() {
	const newTasks = ref([]);
	const loadingTask = ref(true);
	const errorNewTasks = ref(null);
	const { locale } = useI18n({useScope: 'global'})

	const fetchData = async () => {
		try {
			const response = await axios.get(`https://1c95d6dd92be91a6.mokky.dev/newTasks_${locale.value}`);
			newTasks.value = response.data;
		} catch (err) {
			errorNewTasks.value = err.message;
			console.log(errorNewTasks.value);
		} finally {
			loadingTask.value = false;
		}
	};

	const fetchTaskById = async (taskId) => {
		try {
			const response = await axios.get(`https://1c95d6dd92be91a6.mokky.dev/newTasks_${locale.value}/${taskId}`);
			return response.data;
		} catch (err) {
			console.error(err);
			return null;
		}
	};

	const changeLanguageNewTasks = (newLocale) => {
		locale.value = newLocale;
		fetchData();
		fetchTaskById()
	};

	onMounted(fetchData)

	return {
		newTasks,
		loadingTask,
		errorNewTasks,
		fetchData,
		fetchTaskById,
		changeLanguageNewTasks
	};
}