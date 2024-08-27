<script setup>
import DrawerMenu from '@/components/DrawerMenu.vue';
import HeaderMenu from '@/components/HeaderMenu.vue';

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
	// width: 752px;
	width: 100%;
}
.header__text {
	color: $purple;
}
</style>