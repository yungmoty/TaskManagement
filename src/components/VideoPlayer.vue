<script setup>
import { ref, onMounted, onUnmounted, defineExpose } from 'vue';

defineProps({
	videoUrl: String,
})

const videoElement = ref(null)
const isPlaying = ref(true)
const isRestart = ref(false)
const duration = ref(0)
const currentTime = ref(0)
const isControls = ref(false)
const isVolume = ref(false)
const volume = ref(0.7)

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

const formatTime = (seconds) => {
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
	videoElement.value.volume = volume.value
}

const handleClickOutside = () => {
	if (isVolume.value === true) {
		isVolume.value = false
	}
}

const handleVideoEnd = () => {
	isRestart.value = true
}

const handleKeyboardEvents = (event) => {
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

<!-- <template>
<div :class="{ 'mini-player': isMiniPlayer }" class="video-player-container">
	<video
		ref="video"
		@timeupdate="updateProgress"
		@play="updatePlayButton"
		@pause="updatePlayButton"
		@mouseover="showControls = true"
		@mouseleave="showControls = false"
	>
		<source :src="videoUrl" type="video/mp4" />
		Ваш браузер не поддерживает видео.
	</video>


	<div v-if="showControls" class="video-controls-overlay">
		<button v-if="!isPlaying" @click="togglePlay" class="control-btn play-btn">▶</button>
		<button v-if="isPlaying" @click="togglePlay" class="control-btn stop-btn">■</button>
	</div>


	<div v-if="isMiniPlayer" class="mini-player-controls">
		<button @click="toggleMiniPlayer" class="close-btn">✖</button>
	</div>


	<div v-if="!isMiniPlayer" class="controls">
		<button @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</button>
		<input
		type="range"
		min="0"
		:max="videoDuration"
		v-model="currentTime"
		@input="seek"
		/>
		<button @click="toggleFullscreen">{{ isFullscreen ? 'Exit Fullscreen' : 'Fullscreen' }}</button>
		<button @click="toggleMiniPlayer">{{ isMiniPlayer ? 'Maximize' : 'Minimize' }}</button>
		<input
		type="range"
		min="0"
		max="1"
		step="0.01"
		v-model="volume"
		@input="updateVolume"
		/>
	</div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
defineProps({
videoUrl: String,
})

const video = ref(null);
const isPlaying = ref(false);
const isFullscreen = ref(false);
const isMiniPlayer = ref(false);
const showControls = ref(false);
const volume = ref(1);
const currentTime = ref(0);
const videoDuration = ref(0);

const togglePlay = () => {
if (video.value.paused) {
	video.value.play();
} else {
	video.value.pause();
}
};

const updatePlayButton = () => {
isPlaying.value = !video.value.paused;
};

const updateProgress = () => {
currentTime.value = video.value.currentTime;
};

const seek = () => {
video.value.currentTime = currentTime.value;
};

const toggleFullscreen = () => {
if (isFullscreen.value) {
	document.exitFullscreen();
} else {
	video.value.requestFullscreen();
}
isFullscreen.value = !isFullscreen.value;
};

const toggleMiniPlayer = () => {
isMiniPlayer.value = !isMiniPlayer.value;
if (isMiniPlayer.value) {
	video.value.style.position = 'fixed';
	video.value.style.bottom = '0';
	video.value.style.right = '0';
	video.value.style.width = '320px';
	video.value.style.height = '180px';
} else {
	video.value.style.position = 'static';
	video.value.style.width = '100%';
	video.value.style.height = 'auto';
}
};

const updateVolume = () => {
video.value.volume = volume.value;
};

onMounted(() => {
videoDuration.value = video.value.duration;
});

watch(() => video.duration, (newVal) => {
videoDuration.value = newVal;
});
</script>

 <style scoped>
 .video-player-container {
	position: relative;
 }
 
 video {
	width: 100%;
	height: auto;
	transition: opacity 0.3s;
 }
 
 .video-controls-overlay {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	pointer-events: none; /* To ensure video controls can still be used */
 }
 
 .control-btn {
	background: rgba(0, 0, 0, 0.5);
	color: white;
	border: none;
	border-radius: 50%;
	width: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	cursor: pointer;
	transition: background 0.3s;
 }
 
 .control-btn:hover {
	background: rgba(0, 0, 0, 0.8);
 }
 
 .play-btn {
	display: none;
 }
 
 .stop-btn {
	display: none;
 }
 
 .video-player-container:hover .video-controls-overlay .play-btn {
	display: block;
 }
 
 .video-player-container:hover .video-controls-overlay .stop-btn {
	display: block;
 }
 
 .mini-player {
	border: 2px solid #ccc;
	border-radius: 8px;
 }
 
 .mini-player-controls {
	position: absolute;
	bottom: 5px;
	right: 5px;
 }
 
 .close-btn {
	background: rgba(0, 0, 0, 0.5);
	color: white;
	border: none;
	border-radius: 50%;
	width: 24px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	font-size: 18px;
 }
 
 .close-btn:hover {
	background: rgba(0, 0, 0, 0.8);
 }
 
 .controls {
	display: flex;
	justify-content: space-between;
	align-items: center;
 }
 </style>
  -->