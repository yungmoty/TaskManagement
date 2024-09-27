<script setup lang="ts">
import { ref } from 'vue'

// Интерфейс для опций
interface SelectOption {
	name: string
	value: string
}

// Типизируем пропсы
const props = defineProps<{
	selectList: SelectOption[]
}>()

// Состояния компонента
const isOpen = ref<boolean>(false)
const selectedOption = ref(props.selectList[0].name)

function toggleDropdown(): void {
	isOpen.value = !isOpen.value
}

const handleClickOutside = (): void => {
	if (isOpen.value) {
		isOpen.value = false;
	}
}

// Эмит события для обновления выбранной опции
const emit = defineEmits<{
	(e: 'update:selectedOption', value: string): void;
}>()

function selectOption(option: SelectOption): void {
	selectedOption.value = option.name
	isOpen.value = false
	emit('update:selectedOption', option.value)
}
</script>


<template>
	<div
		class="dropdown"
		ref="dropdown"
		:class="{ _active: isOpen }"
		v-click-outside="handleClickOutside"
	>
		<a
			@click.prevent="toggleDropdown"
			href=""
			class="dropdown__link"
		>
			{{ selectedOption }} <span class="_icon-arrow-down"></span>
		</a>
		<Transition name="dropdown">
			<div v-if="isOpen" class="dropdown__items">
				<a
					v-for="item in selectList"
					:key="item.value"
					href=""
					class="dropdown__item"
					@click.prevent="selectOption(item)"
				>
				{{ item.name }}
				</a>
			</div>
		</Transition>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';


.dropdown {
	cursor: pointer;
	position: relative;
	max-width: 400px;
	text-align: right;
	border: 1px solid $medium-white;
	border-radius: 10px;
	transition: all 0.3s ease 0s;

	&._active ._icon-arrow-down {
		transform: rotate(180deg);
	}
	&._active {
		border: 1px solid $dark-blue;
	}
	&:hover {
		border: 1px solid $dark-blue;
	}

	&__link {
		transition: all 0.3s ease 0s;
		z-index: -1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: rem(17) rem(20);
		font-size: rem(14);

		span {
			margin-left: rem(8);
		}
	}
	&__items {
		display: flex;
		flex-direction: column;
		background-color: $white;
		border-radius: rem(10);
		overflow: hidden;
		width: 100%;
		right: 50%;
		transform: translate(50%, 0);
		text-align: start;
		margin-top: rem(15);
		font-weight: 600;
		font-size: rem(14);
		position: absolute;
		transition: all 0.3s ease 0s;
		border: 1px solid $dark-blue;
		z-index: 5;
	}
	&__item {
		padding: rem(17) rem(20);
		transition: all 0.2s ease 0s;
		&:hover {
			background-color: $light-blue;
		}
	}
}
._icon-arrow-down {
	transition: transform 0.4s ease 0s;
	display: inline-block;
	font-size: rem(20);
}
.dropdown-enter-active {
	animation: fadeInUp 0.3s;
}
.dropdown-leave-active {
	animation: fadeInUp 0.3s reverse;
}
@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translate(50%, 0) translate3d(0, 10%, 0);
	}

	to {
		opacity: 1;
		transform: translate(50%, 0) translate3d(0, 0, 0);
	}
}
</style>