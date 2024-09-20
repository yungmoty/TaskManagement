import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n'


export function useMentors() {
	const mentors = ref([]);
	const loading = ref(true);
	const errorMentors = ref(null);
	const { locale } = useI18n({useScope: 'global'})
	
	const fetchData = async () => {
		try {
			const response = await axios.get(`https://1c95d6dd92be91a6.mokky.dev/mentors_${locale.value}`);
			mentors.value = response.data;
		} catch (err) {
			errorMentors.value = err.message;
			console.log(errorMentors.value);
		} finally {
			loading.value = false;
		}
	}
	const changeLanguageMentors = (newLocale) => {
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

