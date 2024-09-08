<script setup>
import { ref } from 'vue'

</script>


<template>
	<button class="submit-btn" type="submit">
		<slot></slot>
	</button>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';

.submit-btn {
	width: 100%;
	height: rem(52);
	background-color: $dark-blue;
	border-radius: rem(10);
	color: $white;
	cursor: pointer;
	font-size: rem(18);
	transition: all 0.3s ease 0s;

	&:hover {
		@media (any-hover: hover){
			transform: scale(0.95);
		}
	}
}

</style>