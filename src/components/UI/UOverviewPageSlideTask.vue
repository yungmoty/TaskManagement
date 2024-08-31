<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
	newTask: {
		type: Object,
		required: true,
	}
})
onMounted(() => {
})
const progress = ref(props.newTask.progress);
</script>


<template>
	<div class="swiper-slide task">
		<a href="" class="task__image">
			<img :src="newTask.image" :alt="newTask.titleImage">
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

	&__image {
		display: block;
		&:hover img {
			transform: scale(1.05);
		}
		img {
			border-radius: rem(10);
			width: 280px;
			height: 110px;
			object-fit: cover;
			transition: transform 0.3s ease 0s;
		}
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