<script setup>
import { onMounted, ref } from 'vue'
import OverviewPageCalendar from '@/components/OverviewPageCalendar.vue';
import { useTaskToday } from "@/hooks/useTaskToday";

const { tasksToday, fetchData, loadingTaskToday } = useTaskToday()
const item = ref([])
const receivedString = ref('');
const isActive = ref(false)

const openSettings = () => {
	isActive.value = !isActive.value
}
const handleStringSent = (payload) => {
	receivedString.value = payload;
}

onMounted(() => {
	fetchData().then(() => {
		// const random = Math.floor(Math.random() * newTasks.value.length)
		let currentDate = new Date();
		let count = currentDate.getDate()
		let maxLength = tasksToday.value.length
		const tmp = Math.ceil(count / (maxLength - 1))

		if (count > maxLength - 1) {
			count -= (maxLength - 1) * (tmp - 1)
		}

		item.value.push(tasksToday.value[count])
	}).catch(error => {
		console.error(error)
	});


})


</script>


<template>
	<aside class="sidebar-menu">
		<div class="sidebar-menu__calendar">
			<OverviewPageCalendar />
		</div>

		<div class="sidebar-menu__current-task current-task">
			<div class="current-task__header">
				<div class="current-task__title">Task Today</div>
				<div 
					:class="{_active : isActive}"
					@click="openSettings" 
					class="current-task__settings"
				>
					<span></span><span></span><span></span>
				</div>
			</div>
			<div v-show="!loadingTaskToday" class="current-task__task">
				<UOverviewPageTaskToday
					@string-sent="handleStringSent"
					classToTaskToday="task-today"
					:useTaskToday="useTaskToday"
					v-for="taskToday in item"
					:taskToday="taskToday"
					:key="taskToday.id"
				/>
			</div>
			<div v-show="loadingTaskToday" class="current-task__loading">
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
			</div>
			<div class="current-task__about">
				<div class="current-task__detail">
					<div class="current-task__subtitle">Detail Task</div>
					<div class="current-task__major">{{ receivedString }}</div>
				</div>
				<ul class="current-task__list">
					<li class="current-task__item">
						<span>1</span>
						Understanding the tools in Figma
					</li>
					<li class="current-task__item">
						<span>2</span>
						Understand the basics of making designs
					</li>
					<li class="current-task__item">
						<span>3</span>
						Design a mobile application with figma
					</li>
				</ul>
				<UButton class="current-task__btn">
					Go To Detail
				</UButton>
			</div>
		</div>
	</aside>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';

.sidebar-menu {
	width: 372px;
	width: 100%;
	display: grid;

	@media (max-width: $laptop){
		@include adaptiveValue(1000, 340, 1024, 'max-width');
	}
	@media (max-width: 400px){
		@include adaptiveValue(460, 410, 410, 'max-width');
	}

	&__calendar {
		margin-bottom: rem(32);
		

		@media (max-width: $laptop){
			justify-self: center;
		}
	}
	&__current-task {
	}
}
.current-task {
	background-color: $white;
	height: max-content;
	border-radius: rem(10);
	&__header {
		display: flex;
		justify-content: space-between;
		padding: rem(22) rem(24) 0 rem(24);
	}
	&__title {
		flex: rem(14);
		font-weight: 600;
	}
	&__settings {
		position: relative;
		width: 20px;
		height: 20px;
		transition: all 0.5s ease 0s;
		cursor: pointer;

		&._active {
			transform: rotate(180deg);
		}
		span {
			position: absolute;
			height: 5px;
			width: 5px;
			background-color: $dark-purple;
			border-radius: 50%;
			top: 50%;
			transform: translateY(-50%);

			&:nth-child(1) {
				left: 0;
			}
			&:nth-child(2) {
				left: 50%;
				transform: translate(-50%, -50%);
			}
			&:nth-child(3) {
				right: 0;
			}
		}
	}
	&__task {
	}
	&__loading {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 328px;
	}
	&__about {
		padding: 0 rem(24) rem(24) rem(24);

		&::before {
			content: '';
			display: flex;
			border: 1px solid $medium-white;
			width: 100%;
			margin-top: rem(8);
			margin-bottom: rem(32);
		}
	}
	&__detail {
		display: flex;
		justify-content: space-between;
		margin-bottom: rem(20);
	}
	&__subtitle {
		font-weight: 600;
	}
	&__major {
		font-size: rem(12);
		color: $purple;
	}
	&__list {
		display: flex;
		flex-direction: column;
		gap: rem(20);
		margin-bottom: rem(26);
	}
	&__item {
		font-size: rem(14);
		display: flex;
		align-items: center;
		gap: rem(12);

		span {
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: 600;
			width: 36px;
			height: 36px;
			border-radius: rem(10);
			background-color: $medium-white;
		}
	}
	&__btn {
		background-color: $dark-blue;
		transition: transform 0.3s ease 0s;

		&:hover {
			transform: scale(0.97);
		}
	}
}
svg{
	padding-left: 30px;
	width: 100px;
	height: 100px;
}
</style>