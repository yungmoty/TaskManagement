<script setup>
import { ref, onMounted, watch } from 'vue'
import { useMyStore } from '@/stores/counter';
import eventBus from '@/directives/eventBus';

const sortIcon = ref('_icon-sort')
const categoryIcon = ref('_icon-category')
const searchTask = ref('')

const categoryArr = ref([
	'Developer',
	'Design',
	'None'
])
const sortArr = ref([
	'Popular',
	'Deadline',
	'None'
])
const selectedCategory = ref('')
const selectedSort = ref('')

const burgerMenu = ref(null)
const bodyClass = ref(false);
const store = useMyStore();

const toggleValue = () => {
	store.toggleValue();

	bodyClass.value = !bodyClass.value;
	if (bodyClass.value) {
		document.body.classList.add('_lock');
	} else {
		document.body.classList.remove('_lock');
	}
};

defineProps({
	title: String,
	isSearchBlock: Boolean,
	backgroundClass: String
})

onMounted(() => {
	eventBus.someEvent = burgerMenu.value;
});


function selectedCategoryOption(option) {
	selectedCategory.value = option;
}
function selectedSortOption(option) {
	selectedSort.value = option
}

const emit = defineEmits()

const sendData = () => {
	emit('send-option', selectedCategory.value, selectedSort.value, searchTask.value)
}
watch(sendData, () => {})

function performSearch(query) {
	searchTask.value = query
}
</script>


<template>
	<header :class="backgroundClass" class="header">
		<div class="header__top">
			<div class="header__content">
				<div class="header__title">{{ title }}</div>
				<slot></slot>
			</div>
			<div ref="burgerMenu" @click="toggleValue" :class="{_active: store.isTrue}" class="menu__icon">
				<div class="menu__wrap"><span></span></div>
				<div class="menu__wrap"><span></span></div>
				<div class="menu__wrap"><span></span></div>
			</div>
			<div class="header__links">
				<UMiniButton class="_icon-notification">
					<span class="header__circle"></span>
				</UMiniButton>
				<a href="" class="header__user">
					<img src="@/assets/images/yungmoty.svg" alt="Profile">
				</a>
			</div>
		</div>
		<div v-if="isSearchBlock" class="header__bottom">
			<div class="header__search">
				<UInput 
					@search="performSearch"
					type="text" 
					placeholder="Search Task"
				/>
			</div>
			<div class="header__sorted">
				<UHeaderSelect 
					@update:selectedOption="selectedCategoryOption"
					selectTitle="Category" 
					:iconClass="categoryIcon" 
					:selectArr="categoryArr"
				/>
				<UHeaderSelect 
					@update:selectedOption="selectedSortOption"
					selectTitle="Sort By" 
					:iconClass="sortIcon" 
					:selectArr="sortArr"
					:isSort="true"
				/>
			</div>
		</div>
	</header>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';


.header {
	

	&.backgroundClass {
		background-color: $white;
	}
	&__top {
		display: flex;
		justify-content: space-between;
		padding: rem(32);
	}
	&__content {

		@media (max-width: $l-dekstop){
		display: none;
		}
	}
	&__title {
		font-weight: 600;
		font-size: rem(24);
		line-height: 150%;
		letter-spacing: -0.03em;
		color: $dark-purple;
	}
	&__links {
		display: flex;
		gap: rem(24);
	}
	&__circle {
			position: absolute;
			background-color: $red;
			height: rem(8);
			width: rem(8);
			border-radius: 50%;
			top: 30%;
			right: 30%;
		}
	&__user {

		img {
			width: rem(52);
			height: rem(52);
		}
	}
	&__bottom {
		display: flex;
		justify-content: space-between;
		gap: rem(24);
		padding: rem(32);
	}
	&__search {
	}
	&__sorted {
		display: flex;
		gap: rem(24);

	}
}
._icon-notification {
	position: relative;
	transition: all 0.3s ease 0s;
	font-size: rem(22);
}

.menu {
	&__icon {
		display: none;
		@media (max-width: $l-dekstop) {
			display: inline-block;
			cursor: pointer;
			z-index: 5;
			width: 52px;
			height: 52px;
			border: 1px solid $medium-white;
			border-radius: 50%;
			padding: 13px;
		}
		&._active .menu__wrap:nth-child(1) {
			width: 50%;
		}
		&._active .menu__wrap:nth-child(2) {
		}
		&._active .menu__wrap:nth-child(3) {
			width: 100%;
		}
	}
	&__wrap {
		transition: all 0.3s ease 0s;
		overflow: visible;
		width: 100%;
		span {
			display: block;
			border-radius: 2px;
			height: 2px;
			margin: 4px auto;
			background-color: $purple;
		}
	}
	&__wrap:nth-child(3) {
		width: 50%;
	}
}
</style>