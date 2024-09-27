<script setup>

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
	transition: all 0.4s ease 0s;
	overflow: hidden;
	position: relative;

	&:after {
		content: "";
		display: block;
		width: 30px;
		height: 200px;
		margin-left: 60px;
		background: #fff;
		opacity: 0.5;
		position: absolute;
		left: -40px;
		top: -100px;
		z-index: 1;
		transform: rotate(45deg);
		transition: all 0.1s;
		animation-name: slideme;
		animation-duration: 3s;
		animation-delay: 0.05s;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
	}

	&:hover {
		@media (any-hover: hover){
			// transform: scale(0.95);
			letter-spacing: 2px;
		}
	}
}

@keyframes slideme {
	0% {
		left: -30px;
		margin-left: 0px;
	}
	30% {
		left: 110%;
		margin-left: 80px;
	}
	100% {
		left: 110%;
		margin-left: 80px;
	}
}
</style>