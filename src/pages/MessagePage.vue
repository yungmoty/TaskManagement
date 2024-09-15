<script setup>
import { ref, computed } from 'vue'
import DrawerMenu from '@/components/DrawerMenu.vue';
import HeaderMenu from '@/components/HeaderMenu.vue';
import MessagePageChat from '@/components/MessagePageChat.vue';

</script>


<template>
	<div class="page">
		<DrawerMenu pageClass="message-page"/>
		<div class="page__content">
			<HeaderMenu 
				pageClass="message-page"
				title="Message"
			/>
			<div class="page__common">
				<MessagePageChat />
			</div>
		</div>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';

.page {
	height: 100vh;
	display: grid;
	grid-template-columns: 16.5% 1fr;

	&__content {
		width: 1210px;
		margin: 0 auto;
	}
	&__common {

	}
}

</style>