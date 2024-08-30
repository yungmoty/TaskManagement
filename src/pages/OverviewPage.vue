<script setup>
import DrawerMenu from '@/components/DrawerMenu.vue';
import HeaderMenu from '@/components/HeaderMenu.vue';
import OverviewPageActivityBlock from '@/components/OverviewPageActivityBlock.vue';
import SliderSwiper from '@/components/SliderSwiper.vue';
import { useMentors } from "@/hooks/useMentors";

const {mentors} = useMentors()
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
				<SliderSwiper sliderTitle="Monthly Mentors">
					<USlideMentor
					:mentors="mentors"
					v-for="mentor in mentors"
					:mentor="mentor"
					:key="mentor.id"
				/>
				</SliderSwiper>
			</div>
		</div>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';

// 752px
.page {
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
</style>