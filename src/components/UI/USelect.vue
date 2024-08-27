<!-- <script setup>
import { ref } from 'vue'

defineProps({
	selectTitle: String,
	selectArr: {
			type: Array,
			required: true
	},
	iconClass: String,
})


const isActive = ref(false)

const choiceSort = () => {
	isActive.value = !isActive.value
}

</script>


<template>
	<div
		:class="{ _active: isActive }"
		@click.prevent="choiceSort"
		class="select"
	>
		<a href="" class="select__link">
			<span :class="iconClass"></span>
			{{ selectTitle }}
		</a>

		<div class="select__items" >
			<a 
				v-for="item in selectArr"
				:item="item"
				:key="item"
				href=""
				class="select__item"
			>
				{{ item }}
			</a>
		</div> 
	</div>
</template>


<style lang='scss'>
@import '@/assets/scss/main.scss';
.select {
	position: relative;
	width: max-content;
	height: rem(52);
	cursor: pointer;

	span {
		font-size: rem(24);
		color: $light-purple;
	}
	&__link {
		padding: rem(14) rem(28);
		display: flex;
		gap: rem(12);
		border: 1px solid #f5f5f7;
		border-radius: rem(10);
		align-items: center;
		transition: all 0.3s ease 0s;

		&:hover {
		background-color: $light-blue;
		}
		&:hover span {
			color: $purple;
		}
	}
	&__items {
		display: none;
		flex-direction: column;
		position: absolute;
		background-color: $medium-white;
		border-radius: rem(10);
		overflow: hidden;
		width: 100%;
		text-align: center;
		bottom: rem(-100);
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
		display: flex;
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

</style> -->


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

defineProps({
	selectArr: {
		type: Array,
		required: true,
	},
	selectTitle: String,
	iconClass: String,
	isSort: Boolean,
});

const selectedOption = ref('');
const isOpen = ref(false);
const select = ref(null);

function toggleDropdown() {
isOpen.value = !isOpen.value;
}

// Закрыть меню при клике вне компонента
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

function selectOption(option) {
	selectedOption.value = ':' + ' ' + option;
	if (selectedOption.value === ':' + ' ' + 'None') selectedOption.value = ''
	isOpen.value = false;
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
			<a href=""
				v-for="item in selectArr"
				:key="item"
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
		display: none;
		flex-direction: column;
		background-color: $medium-white;
		border-radius: rem(10);
		overflow: hidden;
		width: 100%;
		text-align: center;
		margin-top: rem(15);
		font-weight: 600;
		font-size: rem(13);
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
		display: flex;
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
 