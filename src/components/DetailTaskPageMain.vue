<script setup>
import { ref, onMounted, watch } from 'vue';
import { useNewTasks } from '@/hooks/useNewTasks'; 
import { useTaskToday } from '@/hooks/useTaskToday'; 
import { useStudentStore, useSliderStore } from '@/stores/counter';
import VideoPlayer from './VideoPlayer.vue';

const sliderStore = useSliderStore();
const studentStore = useStudentStore();
const { fetchTaskById } = useNewTasks();
const { fetchTaskTodayById } = useTaskToday();
const task = ref(null);
const isVideo = ref(false);
const isControls = ref(true);
const videoPlayerRef = ref(null);

const playVideo = () => {
	isVideo.value = true;
	if (videoPlayerRef.value) {
		videoPlayerRef.value.play();
	}
}
const loadTask = async () => {
	const taskId = sliderStore.activeSlideId;

	if (sliderStore.activeSlider === 'newTasks') {
		task.value = await fetchTaskById(taskId);
	} else if (sliderStore.activeSlider === 'tasksToday') {
		task.value = await fetchTaskTodayById(taskId);
	}
}
watch(() => sliderStore.activeSlideId, loadTask, { immediate: true });

onMounted(async () => {
	studentStore.loadFromLocalStorage();
})

const showControls = () => {
	isControls.value = true
}

const hideControls = () => {
	isControls.value = false
}
</script>


<template>
	<div v-if="task" class="detail-task">
		<div class="detail-task__main-content main-content">
			<div 
				@mouseover="showControls" 
				@mouseout="hideControls" 
				class="main-content__video video-player"
			>
				<img v-if="!isVideo" @click="playVideo" :src="task.image" :alt="task.titleImage">
				<VideoPlayer
					ref="videoPlayerRef"
					v-show="isVideo"
					:videoUrl="task.video"
				/>
				<div 
					v-if="isControls && !isVideo" 
					@click="playVideo" 
					class="video-player__hover-control"
				>
					<span class="_icon-player-play"></span>
				</div>
			</div>
			<div class="main-content__all">
				<div class="main-content__top">
					<div class="main-content__title">{{ task.titleImage }}</div>
					<div class="main-content__major">
						{{ task.major }}. Apps Design 
						<span class="main-content__line"></span>
						<a href="" class="main-content__mentors">+ Get Mentors</a>
					</div>
					<div class="main-content__total">
						<div class="main-content__students">
							<span class="_icon-users"></span>200 Students Involved
						</div>
						<div class="main-content__time">
							<span class="_icon-clock"></span>{{ task.timeLeft }}
						</div>
					</div>
				</div>
				<div class="main-content__middle">
					<div class="main-content__subtitle-middle subtitle">Description</div>
					<div class="main-content__text">
						Follow the video tutorial above. Understand how to use each tool in the Figma application. Also learn how to make a good and correct design. Starting from spacing, typography, content, and many other design hierarchies. Then try to make it yourself with your imagination and inspiration.
					</div>
				</div>
				<div class="main-content__bottom">
					<div class="main-content__subtitle-bottom subtitle">Essence of Assessment</div>
					<ul class="main-content__list">
						<li class="main-content__item">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#546FFF" />
								<path d="M10.5799 15.5801C10.3799 15.5801 10.1899 15.5001 10.0499 15.3601L7.21994 12.5301C6.92994 12.2401 6.92994 11.7601 7.21994 11.4701C7.50994 11.1801 7.98994 11.1801 8.27994 11.4701L10.5799 13.7701L15.7199 8.6301C16.0099 8.3401 16.4899 8.3401 16.7799 8.6301C17.0699 8.9201 17.0699 9.4001 16.7799 9.6901L11.1099 15.3601C10.9699 15.5001 10.7799 15.5801 10.5799 15.5801Z" fill="white" />
							</svg>
							Understanding the tools in Figma
						</li>
						<li class="main-content__item">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#546FFF" />
								<path d="M10.5799 15.5801C10.3799 15.5801 10.1899 15.5001 10.0499 15.3601L7.21994 12.5301C6.92994 12.2401 6.92994 11.7601 7.21994 11.4701C7.50994 11.1801 7.98994 11.1801 8.27994 11.4701L10.5799 13.7701L15.7199 8.6301C16.0099 8.3401 16.4899 8.3401 16.7799 8.6301C17.0699 8.9201 17.0699 9.4001 16.7799 9.6901L11.1099 15.3601C10.9699 15.5001 10.7799 15.5801 10.5799 15.5801Z" fill="white" />
							</svg>
							Understand the basics of making designs
						</li>
						<li class="main-content__item">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#546FFF" />
								<path d="M10.5799 15.5801C10.3799 15.5801 10.1899 15.5001 10.0499 15.3601L7.21994 12.5301C6.92994 12.2401 6.92994 11.7601 7.21994 11.4701C7.50994 11.1801 7.98994 11.1801 8.27994 11.4701L10.5799 13.7701L15.7199 8.6301C16.0099 8.3401 16.4899 8.3401 16.7799 8.6301C17.0699 8.9201 17.0699 9.4001 16.7799 9.6901L11.1099 15.3601C10.9699 15.5001 10.7799 15.5801 10.5799 15.5801Z" fill="white" />
							</svg>
							Designing a mobile application using figma
						</li>
						<li class="main-content__item">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#546FFF" />
								<path d="M10.5799 15.5801C10.3799 15.5801 10.1899 15.5001 10.0499 15.3601L7.21994 12.5301C6.92994 12.2401 6.92994 11.7601 7.21994 11.4701C7.50994 11.1801 7.98994 11.1801 8.27994 11.4701L10.5799 13.7701L15.7199 8.6301C16.0099 8.3401 16.4899 8.3401 16.7799 8.6301C17.0699 8.9201 17.0699 9.4001 16.7799 9.6901L11.1099 15.3601C10.9699 15.5001 10.7799 15.5801 10.5799 15.5801Z" fill="white" />
							</svg>
							Presenting the design flow
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';



.video-player {
	border-radius: rem(10);
	width: 100%;
	min-height: 396px;
	overflow: hidden;
	position: relative;

	&__hover-control {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba($medium-white, 0.5);
		width: 52px;
		height: 52px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: rem(18);
		pointer-events: none;
		transition: all 0.3s ease 0s;
		span {
			color: rgba($dark-purple, 0.9);
		}
	}
}

.main-content {
	&__video {

		img {
			width: 100%;
			max-height: 400px;
			border-radius: rem(10);
			cursor: pointer;
		}
	}
	&__all {
		padding: rem(24);
	}
	&__top {
		display: flex;
		flex-direction: column;
		gap: rem(16);
		margin-bottom: rem(32);
	}
	&__title {
		font-weight: 600;
		font-size: rem(32);
		letter-spacing: -0.03em;
	}
	&__major {
		font-size: rem(14);
		color: $purple;
		display: flex;
	}
	&__line {
		padding: 1px;
		background-color: #dfdfdf;
		border-radius: rem(10);
		margin: 0 rem(10);
	}
	&__mentors {
		color: $blue;
		transition: transform 0.3s ease 0s;

		&:hover {
			transform: translate(15px);
		}
	}
	&__total {
		display: flex;
		font-size: rem(14);
		gap: rem(20);
		
		span {
			color: $purple;
			margin-right: rem(5);
		}
	}
	&__students {
	}
	&__time {
	}
	&__middle {
		margin-bottom: rem(24);
	}
	&__subtitle-middle {
	}
	&__text {
		font-size: rem(14);
	}
	&__bottom {
	}
	&__subtitle-bottom {
	}
	&__list {
		display: flex;
		flex-direction: column;
		gap: rem(20);
	}
	&__item {
		display: flex;
		line-height: 200%;
		align-items: center;
	}
}
.subtitle {
	font-size: rem(24);
	font-weight: 600;
	margin-bottom: rem(16);
	letter-spacing: -0.03em;
}
</style>