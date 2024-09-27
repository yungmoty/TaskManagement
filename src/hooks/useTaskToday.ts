import { ref, onMounted, } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n'

export function useTaskToday() {
	const tasksToday = ref<object[]>([]);
	const loadingTaskToday = ref<boolean>(true);
	const errorTaskToday = ref<string | null>(null);
	const { locale } = useI18n({useScope: 'global'})

	const fetchData = async () => {
		loadingTaskToday.value = true;
		try {
			const response = await axios.get(`https://1c95d6dd92be91a6.mokky.dev/timeLimitTask_${locale.value}`);
			tasksToday.value = response.data;
		} catch (err) {
			errorTaskToday.value = err instanceof Error ? err.message : 'Unknown error';
			console.error('Error fetching new tasks:', errorTaskToday.value);
		} finally {
			loadingTaskToday.value = false;
		}
	}

	const fetchTaskTodayById = async (taskId: number): Promise<any> => {
		try {
			const response = await axios.get(`https://1c95d6dd92be91a6.mokky.dev/timeLimitTask_${locale.value}/${taskId}`);
			return response.data;
		} catch (err) {
			console.error(err);
			return null;
		}
	};

	const changeLanguageTaskToday = async (newLocale: string) => {
		locale.value = newLocale;
		await fetchData();
		// fetchTaskTodayById()
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