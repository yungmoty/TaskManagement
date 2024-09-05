<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const selectedOption = ref('');
const isOpen = ref(false);
const select = ref(null);


const props = defineProps({
	selectArr: {
		type: Array,
		required: true,
	},
	selectTitle: String,
	iconClass: String,
	isSort: Boolean,
});

function toggleDropdown() {
isOpen.value = !isOpen.value;
}

function handleClickOutside(event) {
	if (select.value && !select.value.contains(event.target)) {
		isOpen.value = false;
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside);
});

const emit = defineEmits(['update:selectedOption']);

function selectOption(option) {
	selectedOption.value = ':' + ' ' + option;
	if (selectedOption.value === ':' + ' ' + 'None') selectedOption.value = ''
	isOpen.value = false;
	emit('update:selectedOption', option);
}
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
		<div class="select__items">
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
	</div>
</template>

<style lang="scss" scoped>
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
		border: 1px solid #f5f5f7;
		border-radius: rem(10);
		align-items: center;
		transition: all 0.3s ease 0s;
		font-weight: 600;
		font-size: rem(13);

		&:hover {
		background-color: $light-blue;
		}
		&:hover span {
			color: $purple;
		}
	}
	&__icon {
		margin-right: rem(12);
	}
	&__items {
		display: flex;
		opacity: 0;
		visibility: hidden;
		flex-direction: column;
		background-color: $medium-white;
		border-radius: rem(10);
		overflow: hidden;
		width: 100%;
		text-align: center;
		margin-top: rem(15);
		font-weight: 600;
		font-size: rem(13);
		transition: all 0.3s ease 0s;
		border: 2px solid $light-blue;
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
	&._active &__items {
		opacity: 1;
		visibility: visible;
	}
	&._active &__link {
		background-color: $light-blue;
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
</style>
 