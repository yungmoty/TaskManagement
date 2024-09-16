<script setup>
import { ref, onMounted, onUpdated, watch } from 'vue'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useNewTasks } from '@/hooks/useNewTasks'
import { useTaskToday } from '@/hooks/useTaskToday'; 
import { useStudentStore, useSliderStore } from '@/stores/counter';



const sliderStore = useSliderStore();
const studentStore = useStudentStore()
const { fetchTaskById } = useNewTasks()
const { fetchTaskTodayById } = useTaskToday();
const task = ref(null)
const file = ref(null)
const photoUrl = ref('');
const formattedDate = ref('')
const dataTask = ref({
	name: String,
	class: String,
	id: Number,
	file: null
});

const formatDate = () => {
	const now = new Date()

	formattedDate.value = format(now, 'd MMMM yyyy', { locale: enUS })
};

const loadTask = async () => {
	const taskId = sliderStore.activeSlideId;

	if (sliderStore.activeSlider === 'newTasks') {
		task.value = await fetchTaskById(taskId);
	} else if (sliderStore.activeSlider === 'tasksToday') {
		task.value = await fetchTaskTodayById(taskId);
	}
}
watch(() => sliderStore.activeSlideId, loadTask, { immediate: true });

const loadSavedSlide = () => {
	const savedSlideId = localStorage.getItem('activeSlideId');
	const savedSlider = localStorage.getItem('activeSlider');
	
	
	if (savedSlideId && savedSlider) {
		sliderStore.setActiveSlideId(JSON.parse(savedSlideId));
		sliderStore.setActiveSlider(JSON.parse(savedSlider));
	}
}


onMounted(async () => {
	studentStore.loadFromLocalStorage()
	formatDate()
	loadSavedSlide()
})

onMounted(() => {
	if (studentStore) {
		dataTask.value.name = studentStore.studentName;
		dataTask.value.class = studentStore.studentClass;
		dataTask.value.id = studentStore.studentId;
	}
});

// const sendDataTask = () => {
// 	if (dataTask.value.file) {
// 		const reader = new FileReader();

// 		reader.onload = () => {
// 			dataTask.value.file = reader.result;
// 			localStorage.setItem('dataTask', JSON.stringify(dataTask.value));
// 		};
// 		reader.readAsDataURL(dataTask.value.file);
// 	} else {
// 		localStorage.setItem('dataTask', JSON.stringify(dataTask.value));
// 	}
// }

function handleFileUpload(event) {
	const files = event.target.files;
	if (files.length > 0) {
		const file = files[0];
		dataTask.value.file = file;

		const reader = new FileReader();
		reader.onload = (e) => {
			photoUrl.value = e.target.result;
		};
		reader.readAsDataURL(file);
	}

	const dropArea = file.value
	if (!dropArea) return

	const nameFile = event.target.files[0]?.name || ''
	dataTask.value.file = event.target.files[0]
	
	
	dropArea.style.setProperty('--after-content', `"${nameFile}"`)
}

onUpdated(() => {
	const dropArea = file.value
	if (!dropArea) return

	dropArea.addEventListener('dragover', (e) => {
		e.preventDefault()
		dropArea.classList.add('active')
	});

	dropArea.addEventListener('dragleave', () => {
		dropArea.classList.remove('active')
	});

	dropArea.addEventListener('drop', (e) => {
		e.preventDefault()

		dropArea.classList.remove('active')
		const files = e.dataTransfer.files
		
		dropArea.style.setProperty('--after-content', `"${files[0].name}"`)
	})
})

const WEB3FORMS_ACCESS_KEY = "e74a2fef-3d97-48a4-9513-bdfcd5086d0b";

const submitForm = async () => {
	const response = await fetch("https://api.web3forms.com/submit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			access_key: WEB3FORMS_ACCESS_KEY,
			name: dataTask.value.name,
			class: dataTask.value.class,
			id: dataTask.value.id,
			file: dataTask.value.file,
		}),
	});
	const result = await response.json();
	
	if (result.success) {
		console.log(result);
	}
}
</script>


<template>
	<div v-if="task" class="detail-task">
		<form
			@submit.prevent="submitForm"
			id="task-form"
			class="task-form"
			method="post"
		>
			<div class="task-form__assigned">Assigned Assignments</div>
			<div class="task-form__top">
				<div class="task-form__title">{{ task.titleImage }}</div>
				<div class="task-form__major">{{ task.major }}. Apps Design </div>
			</div>
			<div class="task-form__middle">
				<div class="task-form__subtitle-middle subtitle-folder">Detail Student</div>
				<ul class="task-form__detail-student">
					<li class="task-form__option">
						<p class="task-form__quality">Student's name</p>
						<p class="task-form__name">{{ studentStore.studentName }}</p>
					</li>
					<li class="task-form__option">
						<p class="task-form__quality">Student Class</p>
						<p class="task-form__name">{{ studentStore.studentClass }}</p>
					</li>
					<li class="task-form__option">
						<p class="task-form__quality">Student Number</p>
						<p class="task-form__name">{{ studentStore.studentId }}</p>
					</li>
				</ul>
			</div>
			<div class="task-form__bottom">
				<div class="task-form__subtitle-bottom subtitle-folder">File Task</div>
				<div class="task-form__option">
					<p class="task-form__quality">Last Modified</p>
					<p class="task-form__name">{{ formattedDate }}</p>
				</div>
				<div class="task-form__submission">File submissions</div>
			</div>
			<div ref="file" class="task-form__file">
				<label for="file" class="task-form__label">
					<span class="task-form__icon _icon-folder-open"></span>
				</label>
				<input
					@change="handleFileUpload" 
					type="file" 
					id="file" 
					class="task-form__input"
				>
			</div>
			<p class="task-form__alert">*drag or browser from device</p>
			<USubmitBtn>Submit</USubmitBtn>
		</form>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';



.task-form {

	&__assigned {
		font-weight: 600;
		font-size: rem(14);
		margin-bottom: rem(24);
	}
	&__top {
		margin-bottom: rem(24);
	}
	&__title {
		font-size: rem(24);
		font-weight: 600;
		letter-spacing: -0.03em;
		margin-bottom: rem(12);
		@media (max-width: $mobile-inter){
			font-size: rem(22);
		}
	}
	&__major {
		font-size: rem(14);
		color: $purple;
	}
	&__middle {
		margin-bottom: rem(24);
	}
	&__subtitle-middle {
	}
	&__detail-student {
		display: flex;
		flex-direction: column;
		gap: rem(20);
	}
	&__option {
		display: flex;
		justify-content: space-between
	}
	&__quality {
		font-size: rem(14);
		color: $purple;
	}
	&__name {
		font-size: rem(14);
	}
	&__bottom {
		margin-bottom: rem(16);
	}
	&__subtitle-bottom {
	}
	&__submission {
		font-size: rem(14);
		color: $purple;
		margin-top: rem(20);
	}
	&__file {
		&::after {
			content: var(--after-content, "");
		}
	}
	&__icon {
		font-size: rem(32);
		color: $light-blue;
		transition: color 0.2s ease 0s;
	}
	&__label {
		height: 160px;
		width: 100%;
		border: 1px dashed $dark-blue;
		border-radius: rem(10);
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: all 0.2s ease 0s;

		@media (any-hover: hover){
			&:hover {
				border: 2px solid $dark-blue;
			}
			&:hover .task-form__icon {
				color: $dark-blue;
			}
		}
		@media (max-width: $mobile-inter){
			height: 120px;
		}
	}
	&__input {
		display: none;
	}
	&__alert {
		font-weight: 400;
		font-size: rem(12);
		letter-spacing: -0.01em;
		color: $purple;
		margin-top: rem(12);
		margin-bottom: rem(60);

		@media (max-width: $mobile-inter){
			margin-bottom: rem(40);
		}
	}
	&__btn {
		font-size: rem(14);
		
	}
}
.subtitle-folder {
	font-size: rem(20);
	font-weight: 600;
	margin-bottom: rem(20);

	@media (max-width: $mobile-inter){
		font-size: rem(18);
	}
}
.task-form__file.active .task-form__label {
	background-color: rgba($dark-blue, 0.5);
	border: none;
}
</style>