import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n'


export function useMentors() {
	const mentors = ref<object[]>([]);
	const loading = ref<boolean>(true);
	const errorMentors = ref<string | null>(null);
	const { locale } = useI18n({useScope: 'global'})
	
	const fetchData = async () => {
		loading.value = true;
		try {
			const response = await axios.get(`https://1c95d6dd92be91a6.mokky.dev/mentors_${locale.value}`);
			mentors.value = response.data;
		} catch (err) {
			errorMentors.value = err instanceof Error ? err.message : 'Unknown error';
			console.error('Error fetching mentors:', errorMentors.value);
		} finally {
			loading.value = false;
		}
	}
	const changeLanguageMentors = (newLocale: string) => {
		locale.value = newLocale;
		fetchData();
	};

	onMounted(fetchData)
	return {
		mentors,
		loading,
		errorMentors,
		changeLanguageMentors
	}
}

