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
			<div class="main-wrapper">
				<HeaderMenu 
					title="Hi, Dennis Nzioki"
					:isSearchBlock="false"
				>
					<span class="header__text">Let's finish your task today!</span>
				</HeaderMenu>
				<OverviewPageActivityBlock title="Hi, Dennis Nzioki" />
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
		</div>
		<div class="sidebar-block">
			<OverviewPageSidebar />
		</div>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';

// 752px
.page {
	height: 100vh;
	box-sizing: border-box;
	display: grid;
	// flex-direction: row;
	grid-template-columns: 17.5% auto 30.3%;

	@media (max-width: $l-dekstop){
		grid-template-columns: 1fr auto;
	}
	@media (max-width: $laptop){
		grid-template-columns: 1fr;
	}
}
.main-content {
	// width: 752px;
	// width: 100%;
	background-color: $light-white;
	// @media (max-width: $laptop){
	// 	width: 100%;
	// }
}
.main-wrapper {
	max-width: 752px;
	margin: 0 auto;

	@media (max-width: $l-dekstop){
		@include adaptiveValue(952, 10, 1470, 'max-width');
	}
	@media (max-width: $laptop){
		@include adaptiveValue(1000, 340, 1024, 'max-width');
	}
	@media (max-width: 400px){
		@include adaptiveValue(460, 410, 410, 'max-width');
	}
}
.header__text {
	color: $purple;
}
.mentors-block {
	padding: rem(32);
	padding-top: 0;
	// display: flex;
	// justify-content: center;
}
.task-block {
	padding: 0 rem(32);
}
.sidebar-block {
	padding: rem(32);
	background-color: $medium-white;
	// width: 50vw;
	@media (max-width: $laptop){
		// @include adaptiveValue(1000, 340, 1024, 'max-width');
	}
}
</style>