<script setup>
import { onMounted, ref } from 'vue'
const loading = ref(false)
setTimeout(() => {
	loading.value = true
}, 500);

const props = defineProps({
	newTask: {
		type: Object,
		required: true,
	},
	classToTaskToday: String,
})
const emit = defineEmits(['string-sent']);

function sendString() {
	const stringToSend = props.newTask.major;
	emit('string-sent', stringToSend);
}
onMounted(() => {
	sendString()
})
const progress = ref(props.newTask.progress);


</script>


<template>
	<div :class="classToTaskToday" class="swiper-slide task">
		<a href="" class="task__image">
			<img v-show="loading" :src="newTask.image" :alt="newTask.titleImage">
			<div v-show="!loading" class="task__loading">
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
		</a>
		<a href="" class="task__info">
			<div class="task__title">{{ newTask.titleImage }}</div>
			<div class="task__major">{{ newTask.major }}</div>
		</a>
		<div class="task__progress-bar">
			<div class="task__progress">Progress</div>
			<div class="task__percent">{{ progress }}%</div>
			<div class="task__bar linebar">
				<div class="linebar__wrapper">
					<div class="linebar__progress" :style="{ width: progress + '%' }"></div>
					<div class="linebar__dot" :style="{ left: progress * 0.95 + '%' }"></div>
				</div>
			</div>
		</div>
		<div class="task__bottom">
			<div class="task__time">
				<span class="_icon-clock"></span>
				{{ newTask.timeLeft }}
			</div>
			<div class="task__contributors">
				<a href="" class="task__contributor">
					<img :src="newTask.contributor_1" alt="User">
				</a>
				<a href="" class="task__contributor">
					<img :src="newTask.contributor_2" alt="User">
				</a>
				<a href="" class="task__contributor">
					<img :src="newTask.contributor_3" alt="User">
				</a>
				<a href="" class="task__contributor">
					<img :src="newTask.contributor_4" alt="User">
				</a>
				<a href="" class="task__contributor">
					<img :src="newTask.contributor_5" alt="User">
				</a>
			</div>
		</div>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';

.swiper-slide {
}
.task {
	padding: rem(24);
	background-color: $white;
	border-radius: rem(10);

	&.task-today &__image {
		height: 160px;
	}
	&.task-today {
		padding-top: rem(20);
	}
	&__image {
		display: flex;
		justify-content: center;
		height: 110px;


		&:hover img {
			transform: scale(1.05);
		}
		img {
			border-radius: rem(10);
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.3s ease 0s;
		}
	}
	&__loading {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60px;
		padding-left: 20px;
	}
	&__info {
		display: block;
		margin: rem(16) 0;
		transition: all 0.3s ease 0s;

		&:hover {
			color: $dark-blue;
		}
	}
	&__title {
		font-weight: 600;
	}
	&__major {
		font-size: rem(12);
		color: $purple;
	}
	&__progress-bar {
		display: grid;
		grid-template: repeat(2, 1fr) / repeat(2, 1fr)
	}
	&__progress {
		margin-bottom: rem(8);
	}
	&__percent {
		text-align: right;
		color: $dark-blue;
	}
	&__bar {
		grid-row: 2 / 2;
		grid-column: 1 / 3;
	}
	&__bottom {
		display: flex;
		justify-content: space-between;
		margin-top: rem(16);
	}
	&__time {
		display: flex;

		span {
			font-size: rem(24);
			color: $purple;
			margin-right: rem(8);
			transition: all 0.3s ease 0s;
		}
	}
	&__contributors {
		display: flex;

	}
	&__contributor {
		display: flex;

		img {
			border-radius: 50%;
			width: rem(28);
			height: rem(28);
			object-fit: cover;
			border: 2px solid $white;
		}
		&:nth-child(n) {
			margin-right: -10px;
			transition: transform 0.1s ease 0s;
			&:hover {
				transform: scale(1.1);
			}
		}

	}
}
.linebar {

	&__wrapper {
		position: relative;
		height: 8px;
		background-color: $light-blue;
		border-radius: 10px;
		display: flex;
		align-items: center;
	}
	&__progress {
		height: 100%;
		background-color: $dark-blue;
		border-radius: 8px;
		transition: width 0.4s ease;
		overflow: hidden;
	}
	&__dot {
		width: 16px;
		height: 16px;
		background-color: $dark-blue;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		border: 2px solid #fff;
		transition: left 0.4s ease;
	}
}

</style>