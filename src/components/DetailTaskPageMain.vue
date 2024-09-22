<script setup>
import { ref, onMounted, watch } from 'vue';
import { useNewTasks } from '@/hooks/useNewTasks'; 
import { useTaskToday } from '@/hooks/useTaskToday'; 
import { useStudentStore, useSliderStore } from '@/stores/counter';
import VideoPlayer from './VideoPlayer.vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n({useScope: 'global'})
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

const loadSavedSlide = () => {
	const savedSlideId = localStorage.getItem('activeSlideId');
	const savedSlider = localStorage.getItem('activeSlider');
	
	if (savedSlideId && savedSlider) {
		sliderStore.setActiveSlideId(JSON.parse(savedSlideId));
		sliderStore.setActiveSlider(JSON.parse(savedSlider));
	}
};

onMounted(async () => {
	studentStore.loadFromLocalStorage();
	loadSavedSlide()
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
						{{ task.major }}. {{ $t('detailTask.mainContent.major') }}
						<span class="main-content__line"></span>
						<a @click.prevent href="" class="main-content__mentors">{{ $t('detailTask.mainContent.mentors') }}</a>
					</div>
					<div class="main-content__total">
						<div class="main-content__students">
							<span class="_icon-users"></span>
							{{ $t('detailTask.mainContent.studentInvolved') }}
						</div>
						<div class="main-content__time">
							<span class="_icon-clock"></span>{{ task.timeLeft }}
						</div>
					</div>
				</div>
				<div class="main-content__middle">
					<div class="main-content__subtitle-middle subtitle">{{ $t('detailTask.mainContent.description') }}</div>
					<div class="main-content__text">
						{{ $t('detailTask.mainContent.textDescription') }}
					</div>
				</div>
				<div class="main-content__bottom">
					<div class="main-content__subtitle-bottom subtitle">{{ $t('detailTask.mainContent.assessmentCriteria.title') }}</div>
					<ul class="main-content__list">
						<li class="main-content__item">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#546FFF" />
								<path d="M10.5799 15.5801C10.3799 15.5801 10.1899 15.5001 10.0499 15.3601L7.21994 12.5301C6.92994 12.2401 6.92994 11.7601 7.21994 11.4701C7.50994 11.1801 7.98994 11.1801 8.27994 11.4701L10.5799 13.7701L15.7199 8.6301C16.0099 8.3401 16.4899 8.3401 16.7799 8.6301C17.0699 8.9201 17.0699 9.4001 16.7799 9.6901L11.1099 15.3601C10.9699 15.5001 10.7799 15.5801 10.5799 15.5801Z" fill="white" />
							</svg>
							{{ $t('detailTask.mainContent.assessmentCriteria.case-1') }}
						</li>
						<li class="main-content__item">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#546FFF" />
								<path d="M10.5799 15.5801C10.3799 15.5801 10.1899 15.5001 10.0499 15.3601L7.21994 12.5301C6.92994 12.2401 6.92994 11.7601 7.21994 11.4701C7.50994 11.1801 7.98994 11.1801 8.27994 11.4701L10.5799 13.7701L15.7199 8.6301C16.0099 8.3401 16.4899 8.3401 16.7799 8.6301C17.0699 8.9201 17.0699 9.4001 16.7799 9.6901L11.1099 15.3601C10.9699 15.5001 10.7799 15.5801 10.5799 15.5801Z" fill="white" />
							</svg>
							{{ $t('detailTask.mainContent.assessmentCriteria.case-2') }}
						</li>
						<li class="main-content__item">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#546FFF" />
								<path d="M10.5799 15.5801C10.3799 15.5801 10.1899 15.5001 10.0499 15.3601L7.21994 12.5301C6.92994 12.2401 6.92994 11.7601 7.21994 11.4701C7.50994 11.1801 7.98994 11.1801 8.27994 11.4701L10.5799 13.7701L15.7199 8.6301C16.0099 8.3401 16.4899 8.3401 16.7799 8.6301C17.0699 8.9201 17.0699 9.4001 16.7799 9.6901L11.1099 15.3601C10.9699 15.5001 10.7799 15.5801 10.5799 15.5801Z" fill="white" />
							</svg>
							{{ $t('detailTask.mainContent.assessmentCriteria.case-3') }}
						</li>
						<li class="main-content__item">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#546FFF" />
								<path d="M10.5799 15.5801C10.3799 15.5801 10.1899 15.5001 10.0499 15.3601L7.21994 12.5301C6.92994 12.2401 6.92994 11.7601 7.21994 11.4701C7.50994 11.1801 7.98994 11.1801 8.27994 11.4701L10.5799 13.7701L15.7199 8.6301C16.0099 8.3401 16.4899 8.3401 16.7799 8.6301C17.0699 8.9201 17.0699 9.4001 16.7799 9.6901L11.1099 15.3601C10.9699 15.5001 10.7799 15.5801 10.5799 15.5801Z" fill="white" />
							</svg>
							{{ $t('detailTask.mainContent.assessmentCriteria.case-4') }}
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

	@media (max-width: 1220px){
		min-height: 155px;
	}

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

			@media (max-width: $l-dekstop){
				max-height: 560px;
			}
			@media (max-width: 1350px){
				max-height: 460px;
			}
			@media (max-width: 1180px){
				max-height: 370px;
			}
			@media (max-width: 1080px){
				max-height: 320px;
			}
			@media (max-width: $laptop){
				max-height: 500px;
			}
			@media (max-width: 900px){
				max-height: 400px;
			}
			@media (max-width: 710px){
				max-height: 340px;
			}
			@media (max-width: 610px){
				max-height: 280px;
			}
			@media (max-width: 520px){
				max-height: 240px;
			}
			@media (max-width: 450px){
				max-height: 200px;
			}
			@media (max-width: 380px){
				max-height: 165px;
			}
			@media (max-width: 330px){
				max-height: 140px;
			}
		}
	}
	&__all {
		padding: rem(24);

		@media (max-width: $tablet-inter){
			padding-bottom: rem(10);
		}
		@media (max-width: 375px){
			padding: rem(5);
		}
		@media (max-width: 330px){
			padding-top: 0;
		}
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

		@media (max-width: 517px){
			line-height: 110%;
		}
		@media (max-width: $tablet){
			font-size: rem(28);
		}
		@media (max-width: $mobile-sec-inter){
			font-size: rem(24);
		}
		@media (max-width: $mobile-inter){
			font-size: rem(22);
		}
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
		gap: rem(10);


		svg {
			@media (max-width: 460px){
				width: 18px;
				height: 18px;
			}
			@media (max-width: 370px){
				width: 16px;
				height: 16px;
			}
		}
		@media (max-width: 460px){
			font-size: rem(12);
		}
		@media (max-width: 370px){
			font-size: rem(10);
		}
	}
}
.subtitle {
	font-size: rem(24);
	font-weight: 600;
	margin-bottom: rem(16);
	letter-spacing: -0.03em;

	@media (max-width: $tablet){
		font-size: rem(22);
	}
}
</style>