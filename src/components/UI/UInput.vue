<script setup>
const model = defineModel()

defineProps({
	placeholder: String,
})

</script>


<template>
	<div class="input-search">
		<input 
			v-model="model"
			class="input-search__input" 
			type="text" 
			:placeholder="placeholder"
		>
		<div class="input-search__icon _icon-search"></div>
	</div>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.input-search {
	border: 1px solid $medium-white;
	border-radius: rem(10);
	padding: rem(14) rem(28);
	@include adaptiveValue(480, 250, 1100, 'width');
	height: rem(52);
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: rem(15);

	&__input {
		width: 100%;
		color: $dark-purple;

	}
	&__icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: rem(40);
		height: rem(40);
		font-size: rem(22);
		color: $light-purple;
		cursor: pointer;
		transition: all 0.3s ease 0s;

		&:hover {
			color: $purple;
			transform:  scale(1.1);
		}
	}
}
</style>