<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import { useStudentStore } from '@/stores/counter';
import { useRouter } from 'vue-router';

const studentStore = useStudentStore();
const router = useRouter();

const studentName = ref('');
const studentClass = ref('');
const studentPhotoUrl = ref('');
const isLoading = ref(false)
const username = ref(null)
const userclass = ref(null)
const registerForm = ref(null)

function handleFileUpload(event) {
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();

		reader.onload = (e) => {
			studentPhotoUrl.value = e.target.result;
		};
		reader.readAsDataURL(file);
	}
}

function registerStudent() {
	studentStore.setStudentData({
		name: studentName.value,
		class: studentClass.value,
		id: studentStore.studentId,
		photoUrl: studentPhotoUrl.value 
	});

	studentStore.saveToLocalStorage();
	studentStore.studentId++;
}

let requiredName = false
let requiredClass = false


function validate() {
		if (username.value.value.trim() == '') {
			requiredName = false
			username.value.classList.add('required');
			
			setTimeout(function() {
				username.value.classList.remove('required');
			}, 300);
		} else {
			requiredName = true
		}

		if (userclass.value.value.trim() == '') {
			requiredClass = false
			userclass.value.classList.add('required');
			
			setTimeout(function() {
				userclass.value.classList.remove('required');
			}, 300);
		} else {
			requiredClass = true
		}

		if (requiredName && requiredClass) {
			isLoading.value = true
			setTimeout(() => {
				router.push('/overview')
			}, 1000);
		}
	}
onMounted(() => {
	registerForm.value.addEventListener('submit', validate);
})

</script>


<template>
	<div class="register">
		<form 
			@submit.prevent="registerStudent" 
			id="register"
			ref="registerForm"
			class="register__form register-form"
			method="post"
		>
			<div class="register-form__title">Registration</div>
			<div class="register-form__name">
				<label for="name" class="register-form__label-name reg-label">Name</label>
				<input 
					placeholder="Name..." 
					v-model="studentName" 
					type="text" 
					id="name"
					ref="username"
					class="register-form__input-name reg-input"
				>
			</div>
			<div class="register-form__class">
				<label for="class" class="register-form__label-class reg-label">Class</label>
				<input 
					placeholder="Class..." 
					v-model="studentClass" 
					type="text" 
					id="class"
					ref="userclass"
					class="register-form__input-class reg-input"
				>
			</div>
			<div class="register-form__photo">
				<label for="photo" class="register-form__label-photo">
					Photo
					<span class="register-form__icon _icon-msg-attachfile"></span>
				</label>
				<input
					@change="handleFileUpload" 
					type="file" 
					id="photo" 
					class="register-form__input-photo reg-input"
					accept="image/*"
				>
			</div>
			<Transition>
				<div class="register-form__preview" v-if="studentPhotoUrl">
					<h2 class="register-form__subtitle">Photo preview</h2>
					<img class="register-form__image" :src="studentPhotoUrl" :alt="studentName" />
				</div>
			</Transition>
			<div class="register-form__btn">
				<USubmitBtn>Submit</USubmitBtn>
			</div>
		</form>
		<div v-if="isLoading" class="register__loading">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#546FFF" stroke="%23FF156D" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#546FFF" stroke="%23FF156D" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#546FFF" stroke="%23FF156D" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
		</div>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';


.register {
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: rem(10);
	position: relative;
	
	&__form {
	}
	&__loading {
		height: 100vh;
		width: 100vw;
		position: absolute;
		background-color: rgba($white, 0.7);

		svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 200px;
		}
	}
}
.register-form {
	background-color: $light-white;
	padding: rem(32);
	border-radius: rem(10);
	box-shadow: rgba(84, 111, 255, 0.25) 0px 54px 55px, rgba(84, 111, 255, 0.12) 0px -12px 30px, rgba(84, 111, 255, 0.12) 0px 4px 6px, rgba(84, 111, 255, 0.17) 0px 12px 13px, rgba(84, 111, 255, 0.09) 0px -3px 5px;
	&__title {
		font-size: rem(32);
		text-align: center;
		margin-bottom: rem(40);
		font-weight: 600;
	}
	&__name {
		display: flex;
		gap: rem(20);
		margin-bottom: rem(20);
	}
	&__label-name {

	}
	&__input-name {

	}
	&__class {
		display: flex;
		gap: rem(20);
		margin-bottom: rem(20);
	}
	&__label-class {
	}
	&__input-class {
	}
	&__photo {
		width: 100%;
	}
	&__label-photo {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: rem(15);
		border: 2px dashed $light-purple;
		padding: rem(10) rem(50);
		border-radius: rem(10);
		cursor: pointer;
		font-size: rem(20);
		color: $purple;
		transition: all 0.3s ease 0s;

		&:hover {
			@media (any-hover: hover){
				color: $dark-blue;
				border: 2px dashed $dark-blue;
			}
		}
	}
	&__icon {
		font-size: rem(22);
	}
	&__input-photo {
		display: none;
	}
	&__preview {
		margin-top: rem(20);
	}
	&__subtitle {
		font-size: rem(18);
		color: $purple;
		font-weight: 500;
		margin-bottom: rem(15);
	}
	&__image {
		height: 120px;
		object-fit: cover;
		border-radius: rem(10);
	}
	&__btn {
		margin-top: rem(40);
	}
}
.reg-label {
	font-size: rem(22);
	color: $purple;
	display: flex;
	align-items: center;
	min-width: 70px;
}
.reg-input {
	background-color: inherit;
	border: 2px solid #dfdfdf;
	border-radius: rem(5);
	height: 42px;
	font-size: rem(20);
	width: 100%;
	padding: 0 rem(15);
	transition: border 0.3s ease 0s;

	&:hover {
		@media (any-hover: hover){
			border: 2px solid $dark-blue;
		}
	}
	&:focus {
		border: 2px solid $dark-blue;
	}

	&::placeholder {
		font-size: rem(16);
	}
}
.v-enter-active {
	transition: all 0.4s ease-out;
}
.v-enter-from {
	transform: translateX(30px);
	opacity: 0;
}
.required {
	position: relative;
	animation: shake .1s linear;
	animation-iteration-count: 3;
	border-color: #FF4D5E;
}

@keyframes shake {
	0% { left: -5px; }
	100% { right: -5px; }
}
</style>


