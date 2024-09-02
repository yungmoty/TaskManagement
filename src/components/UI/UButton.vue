<script setup>

</script>


<template>
	<button class="button" >
		<slot></slot>
	</button>
</template>


<style lang='scss'>
@import '@/assets/scss/main.scss';
.button {
	font-weight: 600;
	z-index: 2;
	font-size: rem(14);
	letter-spacing: -0.02em;
	color: $white;
	border-radius: rem(10);
	width: 100%;
	height: 44px;
	background-color: $dark-blue;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: all 0.3s ease 0s;
}
</style>