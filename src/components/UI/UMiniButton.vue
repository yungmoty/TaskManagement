<script setup>
import { ref } from 'vue'

defineProps({
	title: String,
})
</script>


<template>
	<a href="" :class="title" class="mini-btn">
		<slot></slot>
	</a>
</template>


<style lang='scss'>
@import '@/assets/scss/main.scss';

	.mini-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $white;
		border: 1px solid #f5f5f7;
		border-radius: 50%;
		width: rem(52);
		height: rem(52);
		color: $light-purple;
		position: relative;
		transition: all 0.3s ease 0s;

		&:hover {
			background-color: $light-blue;
			color: $purple;
		}
	}
</style>