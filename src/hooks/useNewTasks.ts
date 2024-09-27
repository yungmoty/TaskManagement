import { ref, onMounted, } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n'

export function useNewTasks() {
	const newTasks = ref<object[]>([]);
	const loadingTask = ref<boolean>(true);
	const errorNewTasks = ref<string | null>(null);
	const { locale } = useI18n({useScope: 'global'})

	const fetchData = async () => {
		loadingTask.value = true;
		try {
			const response = await axios.get(`https://1c95d6dd92be91a6.mokky.dev/newTasks_${locale.value}`);
			newTasks.value = response.data;
		} catch (err) {
			errorNewTasks.value = err instanceof Error ? err.message : 'Unknown error';
			console.error('Error fetching new tasks:', errorNewTasks.value);
		} finally {
			loadingTask.value = false;
		}
	};

	const fetchTaskById = async (taskId: number): Promise<any> => {
		try {
			const response = await axios.get(`https://1c95d6dd92be91a6.mokky.dev/newTasks_${locale.value}/${taskId}`);
			return response.data;
		} catch (err) {
			console.error(err);
			return null;
		}
	};

	const changeLanguageNewTasks = async (newLocale: string) => {
		locale.value = newLocale;
		await fetchData();
		// fetchTaskById()
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