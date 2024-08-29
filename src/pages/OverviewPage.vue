<script setup>
import DrawerMenu from '@/components/DrawerMenu.vue';
import HeaderMenu from '@/components/HeaderMenu.vue';
import OverviewPageActivityBlock from '@/components/OverviewPageActivityBlock.vue';
import OverviewPageMentorsBlock from '@/components/OverviewPageMentorsBlock.vue';

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
				<OverviewPageMentorsBlock>

				</OverviewPageMentorsBlock>
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