import { ref, onMounted } from 'vue';
import axios from 'axios';

export function useMentors() {
	const mentors = ref([]);
	const loading = ref(true);
	const errorMentors = ref(null);
	const fetchData = async () => {
		try {
			const response = await axios.get('https://1c95d6dd92be91a6.mokky.dev/mentors');		
			mentors.value = response.data;
		} catch (err) {
			errorMentors.value = err.message;
			console.log(errorMentors.value);
		} finally {
			loading.value = false;
		}
	}

	onMounted(fetchData)
	return {
		mentors,
		loading,
		errorMentors,
	}
}

