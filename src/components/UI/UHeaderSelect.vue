<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n'
import { SortEnum } from '@/enums/sortEnum';

// Типизируем пропсы
const props = defineProps<{
	selectArr: string[],
	selectTitle: string,
	iconClass?: string,
	isSort?: boolean,
	optionsClass?: string,
}>()

const selectedOption = ref<string>('');
const isOpen = ref<boolean>(false);
const select = ref<HTMLElement | null>(null);
const { t } = useI18n({useScope: 'global'})

function toggleDropdown():void {
	isOpen.value = !isOpen.value;
}

function handleClickOutside(event: MouseEvent): void {
	if (select.value && !select.value.contains(event.target as Node)) {
		isOpen.value = false;
	}
}

const emit = defineEmits<{
	(e: 'update:selectedOption', option: string): void;
}>()

function selectOption(option: string): void {
	selectedOption.value = `: ${option}`
	if (selectedOption.value === `: ${t(SortEnum.None)}`) {
		selectedOption.value = ''
	}
	isOpen.value = false
	emit('update:selectedOption', option)
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
	<div
		class="select" 
		ref="select" 
		:class="{ _active: isOpen }"
	>
		<a 
			href="" 
			class="select__link" 
			@click.prevent="toggleDropdown"
		>
			<span class="select__icon" :class="iconClass"></span>
			{{ selectTitle }}
			<div v-if="isSort">{{ selectedOption }}</div>
		</a>
		<Transition name="select-menu">
			<div v-if="isOpen" :class="optionsClass" class="select__items">
				<a 
					href=""
					v-for="item in selectArr"
					:key="item"
					:value="item"
					class="select__item"
					@click.prevent="selectOption(item)"
				>
					{{ item }}
				</a>
			</div>
		</Transition>
	</div>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

.select {
	position: relative;
	width: max-content;
	height: rem(52);
	cursor: pointer;
	z-index: 2;

	span {
		font-size: rem(24);
		color: $light-purple;
	}
	&__link {
		padding: rem(14) rem(28);
		display: flex;
		border: 1px solid $medium-white;
		border-radius: rem(10);
		align-items: center;
		transition: all 0.3s ease 0s;
		font-weight: 600;
		font-size: rem(13);
		background-color: inherit;


		@media (any-hover: hover){
			&:hover {
			background-color: $light-blue;
			}
			&:hover span {
				color: $purple;
			}
		}
	}
	&__icon {
		margin-right: rem(12);
	}
	&__items {
		display: flex;
		flex-direction: column;
		background-color: $medium-white;
		border-radius: rem(10);
		overflow: hidden;
		width: 100%;
		text-align: center;
		margin-top: rem(15);
		font-weight: 600;
		font-size: rem(13);
		border: 2px solid $light-blue;

		&._options {
			transition: all 0s ease 0s;
		}
	}
	&__item {
		padding: rem(10) rem(15);
		&:hover {
			background-color: $light-blue;
		}
	}
	&._active ._icon-sort {
	transform: scaleY(-1);
	}
	&._active ._icon-category {
	transform: rotate(90deg);
	}
	&._active &__link {
		background-color: $light-blue;
		border: 1px solid $light-blue;
	}
	&._active span {
		color: $purple;
	}
}
._icon-category {
	transition: all 0.3s ease 0s;
}
._icon-sort {
	transition: all 0.3s ease 0s;
}
.select-menu-enter-active {
	animation: fadeInUp 0.3s;
}
.select-menu-leave-active {
	animation: fadeInUp 0.3s reverse;
}
@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translate3d(0, 10%, 0);
	}

	to {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}
}
</style>
 