<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useMyStore } from '@/stores/counter';
import { useStudentStore } from '@/stores/counter';
import { useI18n } from 'vue-i18n'
import eventBus from '@/directives/eventBus';
import { CategoryEnum } from '@/enums/categoryEnum';
import { SortEnum } from '@/enums/sortEnum';

// Типизация пропсов
const props = defineProps<{
	title: string,
	isSearchBlock?: boolean,
	pageClass: string,
}>()

const { t } = useI18n({useScope: 'global'})
const studentStore = useStudentStore();
const sortIcon = ref<string>('_icon-sort')
const categoryIcon = ref<string>('_icon-category')
const searchTask = ref<string>('')
const isActiveOption = ref<boolean>(false)

// Локализация категорий и сортировок
const categoryArr = ref<string[]>([
	t(CategoryEnum.Developer),
	t(CategoryEnum.Design),
	t(CategoryEnum.None),
])

const sortArr = ref<string[]>([
	t(SortEnum.Popular),
	t(SortEnum.Deadline),
	t(SortEnum.None),
])

const selectedCategory = ref<string>('')
const selectedSort = ref<string>('')
const burgerMenu = ref<HTMLElement | null>(null)
const bodyClass = ref<boolean>(false);
const store = useMyStore();

// Функция для изменения состояния меню и блокировки прокрутки
const toggleValue = (): void => {
	store.toggleValue();
	bodyClass.value = !bodyClass.value;
	document.body.classList.toggle('_lock', bodyClass.value);
}

// Типизация событий
const emit = defineEmits<{
	(e: 'send-option', category: string, sort: string, search: string): void;
}>()

// Отправка данных выбранной категории, сортировки и поискового запроса
function sendData () {
	emit('send-option', selectedCategory.value, selectedSort.value, searchTask.value)
}

function selectedCategoryOption(option: string): void {
	selectedCategory.value = option;
}
function selectedSortOption(option: string): void {	
	selectedSort.value = option
}
function performSearch(query: string): void {
	searchTask.value = query
}

function activeOption () {
	isActiveOption.value = !isActiveOption.value
}

function handleClickOutside () {
	if (isActiveOption.value) {
		isActiveOption.value = false;
	}
}

// Отслеживание изменений в выбранных категориях и сортировках
watch([selectedCategory, selectedSort], () => {
	isActiveOption.value = false
})

// Отслеживание изменений в данных для отправки
watch(sendData, () => {})

onMounted(() => {
	eventBus.someEvent = burgerMenu.value
	studentStore.loadFromLocalStorage()
})
</script>


<template>
	<header :class="pageClass" class="header">
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
				<a @click.prevent href="" class="header__user">
					<img v-if="studentStore.studentPhotoUrl" :src="studentStore.studentPhotoUrl" :alt="studentStore.studentName">
					<img v-else src="@/assets/images/unavatar.svg" :alt="studentStore.studentName">
				</a>
			</div>
		</div>
		<div v-if="isSearchBlock" class="header__bottom">
			<div class="header__search">
				<UInput 
					@search="performSearch"
					type="text" 
					:placeholder="t('headerMenu.searchInputPlaceholder')"
					class="header__input"
				/>
			</div>
			<div v-click-outside="handleClickOutside" :class="{_active: isActiveOption}" class="header__choice-sort">
				<div @click="activeOption" class="_icon-options"></div>
				<Transition name="bounce">
					<div v-show="isActiveOption" class="header__options">
						<UHeaderSelect
							class="header__option"
							@update:selectedOption="selectedCategoryOption"
							:selectTitle="t('headerMenu.categoryArr.name')" 
							:iconClass="categoryIcon" 
							:selectArr="categoryArr"
							optionsClass="_options"
						/>
						<UHeaderSelect 
							class="header__option"
							@update:selectedOption="selectedSortOption"
							:selectTitle="t('headerMenu.sortArr.name')" 
							:iconClass="sortIcon" 
							:selectArr="sortArr"
							optionsClass="_options"
						/>
					</div>
			</Transition>
			</div>
			<div class="header__sorted">
				<UHeaderSelect 
					@update:selectedOption="selectedCategoryOption"
					:selectTitle="t('headerMenu.categoryArr.name')" 
					:iconClass="categoryIcon" 
					:selectArr="categoryArr"
				/>
				<UHeaderSelect 
					@update:selectedOption="selectedSortOption"
					:selectTitle="t('headerMenu.sortArr.name')" 
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

	&.overview-page &__content,
	&.detail-task-page &__content {
		@media (max-width: $l-dekstop){
			display: none;
		}
	}

	&.task-page &__content,
	&.mentors-page &__content,
	&.message-page &__content {
		@media (max-width: $dekstop){
			display: none;
		}
	}
	&.settings-page &__content {
		@media (max-width: $laptop){
			display: none;
		}
	}

	&.task-page,
	&.mentors-page,
	&.message-page,
	&.detail-task-page,
	&.settings-page {
		background-color: $white;
	}
	&.message-page {
		border-bottom: 1px solid $medium-white;
		border-right: 1px solid #F8F6F7;
	}
	&__top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: rem(32);

		@media (max-width: 425px){
			padding: rem(32) rem(22);
		}
	}
	&__content {

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
			border-radius: 50%;
			object-fit: cover;
		}
	}
	&__bottom {
		display: flex;
		justify-content: space-between;
		gap: rem(24);
		padding: rem(32);

		@media (max-width: 425px){
			padding: rem(32) rem(22);
		}
	}
	&__search {
	}
	&__input {
		padding: rem(14) rem(28);
	}
	&__choice-sort {
		display: none;
		font-size: rem(24);
		padding: rem(14);
		justify-content: center;
		align-items: center;
		border: 1px solid $medium-white;
		border-radius: rem(10);
		color: $light-purple;
		transition: all 0.3s ease 0s;

		&._active {
			background-color: $light-blue;
			color: $purple;
		}
		@media (max-width: $tablet){
			display: flex;
		}
	}
	&__options {
		position: absolute;
		width: 400px;
		height: 88px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba(250, 250, 250, 0.9);
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: rem(10);
		border-radius: rem(10);

		@media (max-width: 470px){
			@include adaptiveValue(400, 310, 470, 'width');
		}
	}

	&__option {
		background-color: $white;
		border-radius: rem(10);
	}
	&__sorted {
		display: flex;
		gap: rem(24);

		@media (max-width: $tablet){
			display: none;
		}
	}
}
._icon-notification {
	position: relative;
	transition: all 0.3s ease 0s;
	font-size: rem(22);
}
.header.overview-page .menu__icon,
.header.detail-task-page .menu__icon {
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
}
.header.task-page .menu__icon,
.header.mentors-page .menu__icon,
.header.message-page .menu__icon {
	@media (max-width: $dekstop) {
		display: inline-block;
		cursor: pointer;
		z-index: 5;
		width: 52px;
		height: 52px;
		border: 1px solid $medium-white;
		border-radius: 50%;
		padding: 13px;
	}
}
.header.settings-page .menu__icon {
	@media (max-width: $laptop) {
		display: inline-block;
		cursor: pointer;
		z-index: 5;
		width: 52px;
		height: 52px;
		border: 1px solid $medium-white;
		border-radius: 50%;
		padding: 13px;
	}
}

.menu {
	&__icon {
		display: none;

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
.bounce-enter-active {
	animation: bounce-in 0.5s;
}
.bounce-leave-active {
	animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
	0% {
		transform: translate(-50%, -50%) scale(0);
	}
	50% {
		transform: translate(-50%, -50%) scale(1.25)
	}
	100% {
		transform: translate(-50%, -50%) scale(1)
	}
}
</style>