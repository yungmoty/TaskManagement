import { StudentData } from '@/interfaces/studentData'
import { defineStore } from 'pinia'
import { ref } from 'vue'



export const useMyStore = defineStore('myStore', () => {
	const isTrue = ref(false)


	function toggleValue() {
		isTrue.value = !isTrue.value
	}

	return { isTrue, toggleValue }
})


// Хранилище для студентов
export const useStudentStore = defineStore('student', () => {
	const studentName = ref('')
	const studentClass = ref('')
	const studentId = ref(1)
	const studentPhotoUrl = ref('')

	function setStudentData(studentData: StudentData) {
		studentName.value = studentData.name
		studentClass.value = studentData.class
		studentId.value = studentData.id
		studentPhotoUrl.value = studentData.photoUrl
	}

	function saveToLocalStorage() {
		const studentData = {
			name: studentName.value,
			class: studentClass.value,
			id: studentId.value,
			photoUrl: studentPhotoUrl.value
		}
		localStorage.setItem('studentData', JSON.stringify(studentData))
	}

	function loadFromLocalStorage() {
		const storedData = localStorage.getItem('studentData')
		if (storedData) {
			try {
				const {
					name: storedName,
					class: storedClass,
					id: storedId,
					photoUrl: storedPhotoUrl 
				} = JSON.parse(storedData)
	
				studentName.value = storedName
				studentClass.value = storedClass
				studentId.value = storedId
				studentPhotoUrl.value = storedPhotoUrl
			} catch (error) {
				console.error(error)
			}
		}
	}

	return {
		studentName,
		studentClass,
		studentId,
		studentPhotoUrl,
		setStudentData,
		saveToLocalStorage,
		loadFromLocalStorage
	}
})



export const useSliderStore = defineStore('slider', () => {
	const activeSlider = ref<string>('newTasks')
	const activeSlideId = ref<number | null>(null)

	function setActiveSlider(sliderType: string) {
		activeSlider.value = sliderType;
	}

	function setActiveSlideId(slideId: number | null) {
		activeSlideId.value = slideId;
	}

	function reset() {
		activeSlider.value = 'newTasks';
		activeSlideId.value = null;
  }

	return {
		activeSlider,
		activeSlideId,
		setActiveSlider,
		setActiveSlideId,
		reset
	}
})

