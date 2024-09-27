<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineExpose } from 'vue';

// Типизация пропсов
defineProps<{
	videoUrl: string // URL видео
}>()

const videoElement = ref<HTMLVideoElement  | null>(null)
const isPlaying = ref<boolean>(true)
const isRestart = ref<boolean>(false)
const duration = ref<number>(0)
const currentTime = ref<number>(0)
const isControls = ref<boolean>(false)
const isVolume = ref<boolean>(false)
const volume = ref<number>(0.7)

const togglePlay = () => {
	if (videoElement.value) {
		if (isPlaying.value && !isRestart.value) {
			videoElement.value.pause()
		} else {
			videoElement.value.play()
		}
		if (isRestart.value) {
			isPlaying.value = false
			videoElement.value.play()
		} 
		isRestart.value = false
		isPlaying.value = !isPlaying.value
	}
}

const toggleVolume = () => {
	if (videoElement.value) {
		isVolume.value = !isVolume.value
	}
}

const updateProgress = () => {
	if (videoElement.value) {
		currentTime.value = videoElement.value.currentTime
	}
}

const seek = () => {
	if (videoElement.value) {
		videoElement.value.currentTime = currentTime.value
	}
}

const initializeProgress = () => {
	if (videoElement.value) {
		duration.value = videoElement.value.duration
	}
}

const showControls = () => {
	if (videoElement.value) {
		isControls.value = true
	}
}

const hideControls = () => {
	if (videoElement.value) {
		isControls.value = false
	}
}
const toggleControls = () => {
	if (videoElement.value) {
		isControls.value = !isControls.value
	}
}

const formatTime = (seconds: number): string => {
	const minutes = Math.floor(seconds / 60)
	const secs = Math.floor(seconds % 60)
	return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

const fullscreen = () => {
	if (videoElement.value) {
		videoElement.value.requestFullscreen()
	}
}

const updateVolume = () => {
	if (videoElement.value) {
		videoElement.value.volume = volume.value; 
	}
}

const handleClickOutside = () => {
	if (isVolume.value === true) {
		isVolume.value = false
	}
}

const handleVideoEnd = () => {
	isRestart.value = true
}

const handleKeyboardEvents = (event: KeyboardEvent) => {
	if (event.key === ' ') {
		event.preventDefault()
		toggleControls()
		togglePlay()
	}
}

const play = () => {
	if (videoElement.value) {
		videoElement.value.play().catch((error) => {
			console.error(error)
		})
	}
}

// Экспонируем метод play, чтобы его можно было вызвать извне
defineExpose({ play })

onMounted(() => {
	if (videoElement.value) {
		videoElement.value.addEventListener('loadedmetadata', initializeProgress)
		videoElement.value.addEventListener('ended', handleVideoEnd)
	}
	document.addEventListener('keydown', handleKeyboardEvents)
})

onUnmounted(() => {
	if (videoElement.value) {
		videoElement.value.removeEventListener('loadedmetadata', initializeProgress)
		videoElement.value.removeEventListener('ended', handleVideoEnd)
	}
	document.removeEventListener('keydown', handleKeyboardEvents)
})
</script>


<template>
	<div
		@mouseover="showControls" 
		@mouseout="hideControls" 
		:class="{_active : isControls}" 
		class="video-player"
	>
		<video 
			ref="videoElement" 
			@timeupdate="updateProgress" 
			@loadedmetadata="initializeProgress"
			@click="togglePlay"
		>
			<source :src="videoUrl" type="video/mp4" />
		</video>
			<div class="video-player__controls">
				<div 
					@click="togglePlay" 
					class="video-player__btns-start"
				>
					<a v-if="!isPlaying && !isRestart" class="video-player__play">
						<span class="_icon-player-play"></span>
					</a>
					<a v-else-if="isPlaying && !isRestart" class="video-player__pause">
						<span class="_icon-player-pause"></span>
					</a>
					<a v-else-if="isRestart" @click="togglePlay" class="video-player__pause">
						<span class="_icon-player-restart"></span>
					</a>
				</div>
				<div class="video-player__progress-bar progress-bar">
					<div class="progress-bar__container">
						<div 
							class="progress-bar__progress-fill" 
							:style="{ width: `${(currentTime / duration) * 100}%` }"
						>	
						</div>
					</div>
					<input 
						type="range" 
						min="0" 
						:max="duration" 
						v-model="currentTime" 
						@input="seek" 
						class="progress-bar__progress-slider" 
					>
				</div>
				<div class="video-player__time-display">
					{{ formatTime(currentTime) }} / {{ formatTime(duration) }}
				</div>
				<div class="video-player__other-btns">
					<p @click="fullscreen" class="video-player__fullscreen">
						<span class="_icon-player-fullscreen"></span>
					</p>
					<p @click="fullscreen" class="video-player__player-mini">
						<span class="_icon-player-mini"></span>
					</p>
					<div v-click-outside="handleClickOutside" class="go">
						<p @click="toggleVolume" class="video-player__volume">
							<span class="_icon-player-volume"></span>
						</p>
						<Transition name="volume">
							<div v-if="isVolume" class="video-player__volume-wrapper">
								<input 
									type="range" 
									min="0"
									max="1"
									step="0.01"
									class="video-player__volume-input"
									v-model="volume"
									@input="updateVolume"
								>
							</div>
						</Transition>
					</div>
				</div>
			</div>
			<div 
				v-if="isControls" 
				@click="togglePlay" 
				class="video-player__hover-control"
			>
				<span v-if="!isPlaying" class="_icon-player-play"></span>
				<span v-else class="_icon-player-pause"></span>
			</div>
	</div>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/main.scss';


.video-player {
	position: relative;
	cursor: pointer;

	
	video {
		border-radius: rem(10);
		height: 100%;
		width: 100%;
	}

	&._active &__controls {
		margin: 0 0 rem(24) rem(24);
		opacity: 1;
	}
	&__controls {
		font-size: rem(20);
		position: absolute;
		width: calc(100% - rem(48));
		bottom: 0;
		background-color: $white;
		display: flex;
		align-items: center;
		height: 44px;
		margin: 0 0 0 rem(24);
		border-radius: rem(10);
		padding: rem(12) rem(24);
		opacity: 0;
		transition: all 0.3s ease 0s;

		@media (max-width: 425px){
			padding: rem(12) rem(12);
		}

	}
	&__btns-start {
		color: $dark-purple;
		cursor: pointer;
	}
	&__play {
		transition: all 0.3s ease 0s;
		@media (any-hover: hover){
			&:hover {
				color: $dark-blue;
			}
		}
	}
	&__pause {
		transition: all 0.3s ease 0s;
		@media (any-hover: hover){
			&:hover {
				color: $dark-blue;
			}
		}
	}
	&__progress-bar {
	}
	&__time-display {
		display: flex;
		flex-direction: row;
		width: max-content;
		margin-right: rem(40);
		white-space: nowrap;
		font-size: rem(14);

		@media (max-width: 500px){
			display: none;
		}
	}
	&__other-btns {
		display: flex;
		gap: rem(12);
		color: $purple;
		position: relative;
	}
	&__fullscreen {
		transition: all 0.3s ease 0s;
		cursor: pointer;
		@media (any-hover: hover){
			&:hover {
				color: $dark-blue;
			}
		}
	}
	&__player-mini {
		transition: all 0.3s ease 0s;
		cursor: pointer;

		@media (any-hover: hover){
			&:hover {
				color: $dark-blue;
			}
		}
		@media (max-width: 375px){
			display: none;
		}
	}
	&__volume {
		transition: all 0.3s ease 0s;
		cursor: pointer;
		display: block;
		@media (any-hover: hover){
			&:hover {
				color: $dark-blue;
			}
		}
	}
	&__volume-wrapper {
		display: flex;
		align-items: center;
		transform: rotate(-90deg);
		background-color: $medium-white;
		padding: rem(10);
		border-radius: rem(23);
		position: absolute;
		bottom: 95px;
		left: 14px;
		width: 120px;
	}
	&__volume-input {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 8px;
		background-color: $light-blue;
		outline: none;
		opacity: 0.7;
		transition: opacity .2s;
		border-radius: rem(10)
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
		span {
			color: rgba($dark-purple, 0.9);
		}
	}
}
.video-player__volume-input::-webkit-slider-thumb {
	appearance: none;
	width: 16px;
	height: 16px;
	background: $dark-blue;
	cursor: pointer;
	border-radius: 50%;
}
.video-player__volume-input::-moz-range-thumb {
	appearance: none;
	width: 16px;
	height: 16px;
	background: $dark-blue;
	cursor: pointer;
	border-radius: 50%;
}
.progress-bar {
	width: 100%;
	flex: 1;
	display: flex;
	align-items: center;
	position: relative;
	margin: 0 rem(24);

	@media (max-width: 375px){
		margin: 0 rem(10);
	}
	&__container {
		flex: 1;
		height: 8px;
		border-radius: 8px;
		background-color: $medium-white;
		position: relative;
	}
	&__progress-fill {
		height: 100%;
		background-color: $dark-purple;
		border-radius: 4px;
		transition: width 0.1s;
	}
	&__progress-slider {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}
}
.volume-enter-active {
	transition: all 0.3s ease-out;
}

.volume-leave-active {
	transition: all 0.3s ease-out;
}

.volume-enter-from,
.volume-leave-to {
	transform: rotate(-90deg) translateX(-15px);
	opacity: 0;
}

</style>