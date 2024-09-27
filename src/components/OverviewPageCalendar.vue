<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, } from 'vue';
import moment from 'moment';
import { useI18n } from 'vue-i18n'

const { t } = useI18n({useScope: 'global'})


const countDays = ref<number>(1)
const namePeriod = ref<'week' | 'day'>('week')
const lengthDays = ref<number>(7)
const currentWeekStart = ref<moment.Moment>(moment().startOf(namePeriod.value));
const today = moment();

const isToday = computed(() => currentWeekStart.value.isSame(today, namePeriod.value))

const days = computed(() => {
	const weekStart = currentWeekStart.value.clone().startOf(namePeriod.value);
	return Array.from({ length: lengthDays.value }, (_, i) => weekStart.clone().add(i, 'days'));
});

const header = computed(() => currentWeekStart.value.format('MMMM YYYY'));

function previousWeek(): void {
	currentWeekStart.value = currentWeekStart.value.clone().subtract(countDays.value, namePeriod.value);
}

function nextWeek(): void {
	currentWeekStart.value = currentWeekStart.value.clone().add(countDays.value, namePeriod.value);
}

function goToCurrentDay(): void {
	currentWeekStart.value = moment().startOf('day');
}

// Оптимизация обновления отображения
const updateDisplay = (): void => {
	if (window.innerWidth <= 425) {
		countDays.value = 5;
		lengthDays.value = 5;
		namePeriod.value = 'day';
	} else {
		countDays.value = 1;
		lengthDays.value = 7;
		namePeriod.value = 'week';
	}
}

onMounted(() => {
	updateDisplay ()
	window.addEventListener('resize', updateDisplay )
})
onUnmounted(() => {
	window.removeEventListener('resize', updateDisplay)
})
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
			<span @click="goToCurrentDay">{{ $t('overview.calendar.today') }}</span>
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
	@media (max-width: 425px){
		@include adaptiveValue(372, 320, 425, 'width');
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
