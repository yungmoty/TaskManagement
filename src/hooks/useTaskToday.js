import { ref, onMounted, } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n'

export function useTaskToday() {
	const tasksToday = ref([]);
	const loadingTaskToday = ref(true);
	const errorTaskToday = ref(null);
	const { locale } = useI18n({useScope: 'global'})

	const fetchData = async () => {
		try {
			const response = await axios.get(`https://1c95d6dd92be91a6.mokky.dev/timeLimitTask_${locale.value}`);
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
			const response = await axios.get(`https://1c95d6dd92be91a6.mokky.dev/timeLimitTask_${locale.value}/${taskId}`);
			return response.data;
		} catch (err) {
			console.error(err);
			return null;
		}
	};

	const changeLanguageTaskToday = (newLocale) => {
		locale.value = newLocale;
		fetchData();
		fetchTaskTodayById()
	};

	onMounted(fetchData)

	return {
		tasksToday,
		loadingTaskToday,
		errorTaskToday,
		fetchData,
		fetchTaskTodayById,
		changeLanguageTaskToday
	};
}