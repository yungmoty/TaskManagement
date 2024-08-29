import { ref, onMounted } from 'vue';
import axios from 'axios';

// const mentors = ref([]);
// const loading = ref(true);
// const error = ref(null);

// async function fetchData() {
// 	try {
// 		loading.value = true;
// 		const response = await axios.get('https://1c95d6dd92be91a6.mokky.dev/mentors');
// 		mentors.value = response.data;
// 	} catch (err) {
// 		error.value = err.message;
// 	} finally {
// 		loading.value = false;
// 	}
// }

// onMounted(fetchData)

export function useMentors() {
	const mentors = ref([]);
	const loading = ref(true);
	const error = ref(null);
	const fetchData = async () => {
		try {
			const response = await axios.get('https://1c95d6dd92be91a6.mokky.dev/mentors');
			mentors.value = response.data;
		} catch (err) {
			error.value = err.message;
		} finally {
			loading.value = false;
		}
	}

	onMounted(fetchData)
	return {
		mentors,
		loading,
		error,
	}
}
{/* <div v-if="loading" class="slider__loading">
<svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
	<circle fill="#546FFF" stroke="none" cx="6" cy="50" r="6">
		<animateTransform 
			attributeName="transform" 
			dur="1s" 
			type="translate" 
			values="0 15 ; 0 -15; 0 15" 
			repeatCount="indefinite" 
			begin="0.1"/>
	</circle>
	<circle fill="#546FFF" stroke="none" cx="30" cy="50" r="6">
		<animateTransform 
			attributeName="transform" 
			dur="1s" 
			type="translate" 
			values="0 10 ; 0 -10; 0 10" 
			repeatCount="indefinite" 
			begin="0.2"/>
	</circle>
	<circle fill="#546FFF" stroke="none" cx="54" cy="50" r="6">
		<animateTransform 
			attributeName="transform" 
			dur="1s" 
			type="translate" 
			values="0 5 ; 0 -5; 0 5" 
			repeatCount="indefinite" 
			begin="0.3"/>
	</circle>
</svg>
</div> */}
