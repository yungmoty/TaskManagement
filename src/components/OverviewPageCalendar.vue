<script setup>
import { ref, computed } from 'vue';
import moment from 'moment';

const currentWeekStart = ref(moment().startOf('week'));
const today = moment();

const isToday = computed(() => currentWeekStart.value.isSame(today, 'week'))

const days = computed(() => {
	const weekStart = currentWeekStart.value.clone().startOf('week');
	return Array.from({ length: 7 }, (_, i) => weekStart.clone().add(i, 'days'));
});

const header = computed(() => currentWeekStart.value.format('MMMM YYYY'));

function previousWeek() {
	currentWeekStart.value = currentWeekStart.value.clone().subtract(1, 'week');
}

function nextWeek() {
	currentWeekStart.value = currentWeekStart.value.clone().add(1, 'week');
}

function goToCurrentDay() {
	currentWeekStart.value = moment().startOf('day');
}


</script>


<template>
	<div class="calendar">
		<div class="calendar__header">
			<a 
				href="" 
				class="calendar__btn btn-prev" 
				@click.prevent="previousWeek"
			>
				<span class="_icon-arrow-slider"></span>
			</a>
			<div class="calendar__title">{{ header }}</div>
			<a 
				href="" 
				class="calendar__btn btn-next" 
				@click.prevent="nextWeek"
			>
				<span class="_icon-arrow-slider"></span>
			</a>
		</div>
		<div 
			v-if="!isToday" 
			class="calendar__today" 
		>
			<span @click="goToCurrentDay">Today</span>
		</div>
		<div class="calendar__days">
			<TransitionGroup>
				<div
					v-for="(day, index) in days"
					:key="index"
					class="calendar__day"
					:class="{ today: day.isSame(today, 'day'), 'current-month': day.month() === today.month() }"
				>
					<div class="calendar__day-name">{{ day.format('dddd')[0] }}</div>
					<div class="calendar__day-date">{{ day.date() }}</div>
				</div>
			</TransitionGroup>
		</div>
	</div>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/main.scss';


.v-move {
	transition: all 0.4s ease 0s;
}
.calendar {
	// width: 100%;
	width: 372px;
	padding: rem(20);
	background-color: $white;
	border-radius: rem(10);

	@media (max-width: $laptop){
		width: 500px;
		padding: rem(30);
	}
	@media (max-width: $mobile-sec-inter){
		width: 372px;
		padding: rem(20);
	}
	&__header {
		display: flex;
		justify-content: space-between;
	}
	&__btn {
		font-size: rem(20);
		color: $purple;
		transition: color 0.3s ease 0s;
		padding: rem(4);
		&:hover {
			color: $dark-blue;
		}
	}
	&__title {
		font-weight: 600;
		font-size: rem(14);
		@media (max-width: $laptop){
			font-size: rem(18);
		}
		@media (max-width: $mobile-sec-inter){
			font-size: rem(16);
		}
	}
	&__today {
		display: flex;
		justify-content: center;
		margin-bottom: -38px;
		margin-top: -2px;

		span {
			padding: rem(8) rem(25);
			background-color: $medium-white;
			cursor: pointer;
			border-radius: rem(10);
			transition: all 0.3s ease 0s;

			&:hover {
				color: $white;
			background-color: $dark-blue;
			}
		}
	}
	&__days {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 72px;
		margin-top: rem(36);
	}
	&__day {
		width: 32px;
		height: 60px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		display: flex;
		align-items: center;
		overflow: hidden;
		cursor: pointer;

		&:hover {
			background-color: $medium-white;
			border-radius: rem(20);
			.calendar__day-date {
				color: $white;
				background-color: $dark-blue;
			}
		}
		&.today {
			justify-content: space-evenly;
			color: $white;
			height: 72px;
			width: 40px;
			background-color: $dark-purple;
			border-radius: rem(23);
			
			.calendar__day-date {
				background-color: $dark-blue;
			}
		}
	}
	&__day-name {
		font-size: rem(12);
	}
	&__day-date {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background-color: $medium-white;
		border-radius: 50%;
	}
}
.btn-prev {
	transform: rotate(180deg);
}
.btn-next {
}

</style>
