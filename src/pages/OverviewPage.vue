<script setup>
import DrawerMenu from '@/components/DrawerMenu.vue';
import HeaderMenu from '@/components/HeaderMenu.vue';
import OverviewPageActivityBlock from '@/components/OverviewPageActivityBlock.vue';
import SliderSwiper from '@/components/SliderSwiper.vue';
import OverviewPageSidebar from '@/components/OverviewPageSidebar.vue';


import { useMentors } from "@/hooks/useMentors";
import { useNewTasks } from "@/hooks/useNewTasks";
const { mentors } = useMentors()
const { newTasks } = useNewTasks()


</script>


<template>
	<div class="page">
		<DrawerMenu />
		<div class="main-content">
			<HeaderMenu 
				title="Hi, Dennis Nzioki"
				:isSearchBlock="false"
			>
				<span class="header__text">Let's finish your task today!</span>
			</HeaderMenu>
			<OverviewPageActivityBlock />
			<div class="mentors-block">
				<SliderSwiper 
					nameSwiper="swiper1" 
					swiperBtn="swiper1-btn" 
					sliderTitle="Monthly Mentors"
				>
					<UOverviewPageSlideMentor
						:mentors="mentors"
						v-for="mentor in mentors"
						:mentor="mentor"
						:key="mentor.id"
					/>
				</SliderSwiper>
			</div>
			<div class="task-block">
				<SliderSwiper 
					nameSwiper="swiper2" 
					swiperBtn="swiper2-btn" 
					sliderTitle="Upcoming Task"
				>
					<UOverviewPageSlideTask
						:newTasks="newTasks"
						v-for="newTask in newTasks"
						:newTask="newTask"
						:key="newTask.id"
					/>
				</SliderSwiper>
			</div>
		</div>
		<OverviewPageSidebar />

	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';

// 752px
.page {
	// height: calc(100vh - 0px);
	height: 100vh;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
}
.main-content {
	width: 752px;
	background-color: $light-white;
}
.header__text {
	color: $purple;
}
.mentors-block {
	padding: rem(32);
	padding-top: 0;
}
.task-block {
	padding: 0 rem(32);
}
</style>