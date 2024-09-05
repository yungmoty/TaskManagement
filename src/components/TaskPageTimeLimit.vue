<script setup>
import SliderSwiper from '@/components/SliderSwiper.vue';

defineProps({
	tasksToday: {
		type: Array,
		required: true
	},
})
</script>


<template>
		<SliderSwiper 
			nameSwiper="swiper3" 
			swiperBtn="swiper3-btn" 
			sliderTitle="Time Limit"
		>
			<transition-group name="task-list">
				<UOverviewPageTaskToday
					v-for="taskToday in tasksToday"
					:taskToday="taskToday"
					:key="taskToday.id"
				/>
			</transition-group>
		</SliderSwiper>

</template>


<style lang='scss' scoped>

</style>