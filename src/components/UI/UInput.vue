<script setup>
import { ref } from 'vue'
const model = defineModel()

defineProps({
	placeholder: String,
})

const emit = defineEmits(['search']);


const query = ref('');

function searchClick() {
	emit('search', query.value);
}
function searchKeydown(event) {
	if (event.key === 'Enter') {
		event.preventDefault();
		searchClick();
	}
}
</script>


<template>
	<div class="input-search">
		<input 
			v-model="query"
			class="input-search__input" 
			type="text" 
			:placeholder="placeholder"
			@keydown="searchKeydown"
		>
		<div @click="searchClick" class="input-search__icon _icon-search"></div>
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
	@media (max-width: 415px) {
			@include adaptiveValue(270, 150, 415, 'width');
	}

	&__input {
		width: 100%;
		color: $dark-purple;
		background-color: inherit;
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