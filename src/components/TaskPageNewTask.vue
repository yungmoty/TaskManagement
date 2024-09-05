<script setup>
import SliderSwiper from '@/components/SliderSwiper.vue';
defineProps({
	newTasks: {
		type: Array,
		required: true
	},
})
</script>


<template>
		<SliderSwiper 
			nameSwiper="swiper4" 
			swiperBtn="swiper4-btn" 
			sliderTitle="New Task"
		>
			<transition-group name="task-list">
				<UOverviewPageSlideTask
					v-for="newTask in newTasks"
					:newTask="newTask"
					:key="newTask.id"
				/>
			</transition-group>
		</SliderSwiper>

</template>


<style lang='scss' scoped>

</style>