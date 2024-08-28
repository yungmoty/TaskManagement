<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentTask = ref(65)
const completedTasks = currentTask
const totalTasks = ref(100)
const percentSvg = computed(() => {
	return Math.floor((300 - (completedTasks.value / totalTasks.value * 300)))
})
const percent = computed(() => {
	return Math.floor(((completedTasks.value / totalTasks.value) * 100))
})
const timeInterval = ref([
	'This Day',
	'This Week',
	'This Mounth',
])
const selectedOption = ref(timeInterval.value[1]);
const isOpen = ref(false);
const dropdown = ref(null);


function toggleDropdown() {
isOpen.value = !isOpen.value;
}

// Закрыть меню при клике вне компонента
function handleClickOutside(event) {
	if (dropdown.value && !dropdown.value.contains(event.target)) {
		isOpen.value = false;
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside);
});

function selectOption(option) {
	selectedOption.value = option;
	isOpen.value = false;
}

</script>


<template>
	<div class="activity-block">
		<div class="activity-block__progress-task progress-task">
			<div class="progress-task__title">Running Task</div>
			<div class="progress-task__current">{{ currentTask }}</div>
			<div class="progress-task__all">
				<div class="progress-task__progress">
						<svg class="progress-task__svg" viewBox="0 0 102 102">
							<circle cx="51" cy="51" r="47.8" fill="none" stroke="#1F264C" stroke-width="6"/>
							<circle cx="51" cy="51" r="47.8" fill="none" stroke="#546FFF" stroke-width="6" stroke-linecap="round" stroke-dasharray="300" :stroke-dashoffset="percentSvg"/>
						</svg>
						<span class="progress-task__percent">
							{{ percent }}%
						</span>
				</div>
				<div class="progress-task__total">
					{{ totalTasks }}
					<span>Task</span>
				</div>
			</div>
		</div>
		<div class="activity-block__activity-graph activity-graph">
			<div class="activity-graph__header">
				<div class="activity-graph__title">Activity</div>

				<div
					ref="dropdown"
					:class="{ _active: isOpen }" 
					class="activity-graph__time-interval"
				>
					<a
						@click.prevent="toggleDropdown"
						href=""
						class="activity-graph__link"
					>
						{{ selectedOption }} <span class="_icon-arrow-down"></span>
					</a>
					<div class="activity-graph__items">
						<a
							v-for="item in timeInterval"
							:key="item"
							href=""
							class="activity-graph__item"
							@click.prevent="selectOption(item)"
						>
						{{ item }}
						</a>
					</div>
				</div>
			</div>
			<div class="activity-graph__block">
				<UChart />
			</div>
		</div>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';

.activity-block {
	display: flex;
	gap: rem(32);
	padding: rem(32);

		&__progress-task {

		}
		&__activity-graph {
		}
}
.progress-task {
	border-radius: rem(10);
	width: 194px;
	height: 214px;
	background: $dark-purple;
	color: $white;
	padding: rem(20);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	cursor: pointer;
	transition: box-shadow 0.3s ease 0s;

	&:hover {
		box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
	}

		&__title {
			font-weight: 600;
			line-height: 150%;
		}
		&__current {
			font-weight: 600;
			font-size: rem(32);
			line-height: 150%;
			letter-spacing: -0.03em;
		}
		&__all {
			display: flex;
			gap: rem(18);
			align-items: center;
		}
		&__progress {
			position: relative;
		}
		&__svg {
			width: 70px;
			height: 70px;
			transform: rotate(-90deg);
			border-radius: 50%;
		}
		&__percent {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: rem(18);
			line-height: 150%;
		}
		&__total {
			display: flex;
			flex-direction: column;
			span {
				font-size: rem(14);
				color: $light-purple;
			}
		}
}
.activity-graph {
	background-color: $medium-white;
	width: 462px;
	padding: rem(20);
	border-radius: rem(10);

	&__header {
		display: flex;
		justify-content: space-between;
		font-weight: 600;
		margin-bottom: rem(20);
	}
	&__time-interval {
		cursor: pointer;
		position: relative;
		z-index: 1;

		&._active .activity-graph__items {
			opacity: 1;
			visibility: visible;
		}
		&._active ._icon-arrow-down {
			transform: rotate(180deg);
		}
		&._active .activity-graph__link {
			color: $dark-blue;
		}
	}
	&__link {
		transition: all 0.3s ease 0s;
		span {
			margin-left: rem(8);
		}
		&:hover {
			color: $dark-blue;
		}
	}
	&__items {
		display: flex;
		opacity: 0;
		visibility: hidden;
		flex-direction: column;
		background-color: $medium-white;
		border-radius: rem(10);
		overflow: hidden;
		width: 120%;
		right: 50%;
		transform: translate(50%, 0);
		text-align: center;
		margin-top: rem(15);
		font-weight: 600;
		font-size: rem(13);
		position: absolute;
		transition: all 0.3s ease 0s;
		border: 2px solid $light-blue;
	}
	&__item {
		padding: rem(10) rem(15);
		&:hover {
			background-color: $light-blue;
		}
	}
	&__block {
		height: 130px;
		background-color: $white;
		border-radius: rem(10);
		padding: rem(15);
		cursor: pointer;
	}
}
._icon-arrow-down {
	transition: transform 0.3s ease 0s;
	display: inline-block;
}















// .circle-container {
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	height: 100vh;
// }

// .circle {
// 	width: 70px;
// 	height: 70px;
// 	transform: rotate(-90deg);
// 	background-color: #f0f0f0;
// 	border-radius: 50%;
// }
</style>