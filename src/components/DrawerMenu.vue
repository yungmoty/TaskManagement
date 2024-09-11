<script setup>
import { useRoute } from 'vue-router';
import { computed, ref, onMounted, onUnmounted, watch} from 'vue';
import eventBus from '@/directives/eventBus';
import { useMyStore } from '@/stores/counter';

const route = useRoute();
const currentPath = computed(() => route.path);
const store = useMyStore();
const drawerMenu = ref(null);
let burgerMenu

defineProps({
	open: Boolean,
	pageClass: String,
})

watch(() => eventBus.someEvent, (newValue) => {
	burgerMenu = newValue
});


function handleClickOutside(event) {
	if (drawerMenu.value && !drawerMenu.value.contains(event.target) && !burgerMenu.contains(event.target)) {
		store.isTrue = false
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside);
});

const taskDetailPattern = /^\/task-detail\/\d+$/
</script>


<template>
		<aside ref="drawerMenu" :class="[{_active: store.isTrue}, pageClass]" class="sidebar">
			<div class="sidebar__logo">
				<img src="@/assets/images/logo.svg" alt="Logo">
			</div>
			<div class="sidebar__body">
				<div class="sidebar__navigation">
					<div 
						:class="{_active : currentPath === '/overview'}" 
						@click="$router.push('/overview')"
						class="sidebar__link"
					>
						<span class="_icon-overview"></span>
						Overview
					</div>
					<div 
						:class="[{_active : currentPath === '/task'}, {_active : taskDetailPattern.test(currentPath)}]"
						@click="$router.push('/task')"
						class="sidebar__link"
					>
						<span class="_icon-task"></span>
						Task
					</div>
					<div 
						:class="{_active : currentPath === '/mentors'}"
						@click="$router.push('/mentors')"
						class="sidebar__link"
					>
						<span class="_icon-mentors"></span>
						Mentors
					</div>
					<div 
						:class="{_active : currentPath === '/message'}" 
						class="sidebar__link"
					>
						<span class="_icon-message"></span>
						Message
					</div>
					<div 
						:class="{_active : currentPath === '/settings'}" 
						class="sidebar__link"
					>
						<span class="_icon-settings"></span>
						Settings
					</div>
				</div>
				<div class="sidebar__help">
						<div class="sidebar__item sidebar__item_circle-1"></div>
						<div class="sidebar__item sidebar__item_circle-2"></div>
						<div class="sidebar__item sidebar__item_mark">?</div>
						<div class="sidebar__title">Help Center</div>
						<div class="sidebar__text">Having Trouble in Learning. Please contact us for more questions.
						</div>
						<UButton class="sidebar__btn" >Go To Help Center</UButton>
				</div>
			</div>
		</aside>
</template>


<style lang='scss'>
@import '@/assets/scss/main.scss';

.sidebar {
	width: 252px;
	height: 100vh;
	display: flex;
	align-items: center;
	flex-direction: column;
	background-color: $white;
	z-index: 5;
	position: relative;
	transition: all 0.5s ease 0s;

	@media (max-width: 374px){
		width: 225px;
	}

	&.overview-page,
	&.detail-task-page{
		@media (max-width: $l-dekstop){
			position: fixed;
			overflow: auto;
			box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
			border-radius: rem(32) 0 0 rem(32);
			top: 0;
			right: -100%;
			
			&._active {
				right: 0;
				animation: slideInRight;
			}
		}
		@media (max-width: $laptop-inter){
			height: 100%;
		}
	}
	&.task-page {
		@media (max-width: $dekstop) {
			position: fixed;
			overflow: auto;
			box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
			border-radius: rem(32) 0 0 rem(32);
			top: 0;
			right: -100%;
			
			&._active {
				right: 0;
				animation: slideInRight;
			}
		}
		@media (max-width: $laptop-inter){
			height: 100%;
		}
	}


	&__logo {
		margin-bottom: rem(60);
		padding-top: rem(32);

		@media (max-width: $laptop-inter){
			margin-bottom: rem(25);
			padding-top: rem(25);
		}
	}
	&__body {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
	}
	&__navigation {
		display: flex;
		flex-direction: column;
		gap: rem(24);

		@media (max-width: $laptop-inter){
			margin-bottom: rem(40);
		}
	}
	&__link {
		font-weight: 600;
		font-size: rem(14);
		line-height: 150%;
		letter-spacing: -0.02em;
		color: $light-purple;
		display: flex;
		gap: rem(12);
		align-items: center;
		cursor: pointer;
		padding: rem(10) rem(20);
		transition: all 0.3s ease 0s;

		span {
			font-size: rem(24);
		}
		&:hover {
			color: $dark-purple;
			background-color: $medium-white;
			border-radius: rem(10);
		}
		&._active {
			color: $dark-purple;
			background-color: $medium-white;
			border-radius: rem(10);
		}
	}
	&__help {
		border-radius: rem(10);
		position: relative;
		width: 188px;
		height: 248px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: rem(16);
		align-items: center;
		background: $dark-purple;
		z-index: 1;
		margin-bottom: rem(32);

		@media (max-width: $laptop-inter){
			// display: none;
		}
	}
	&__item {
		&_circle-1 {
			position: absolute;
			width: rem(160);
			height: rem(160);
			background-color: rgba(255, 255, 255, 0.08);
			top: rem(0);
			left: rem(0);
			clip-path: circle(65px at 0 0);
		}
		&_circle-2 {
			position: absolute;
			width: rem(160);
			height: rem(160);
			background-color: rgba(255, 255, 255, 0.08);
			bottom: rem(0);
			right: rem(0);
			clip-path: circle(80px at 160px 160px);
		}
		&_mark {
			position: absolute;
			width: rem(48);
			height: rem(48);
			font-weight: 700;
			font-size: rem(28);
			line-height: 120%;
			letter-spacing: 0.01em;
			display: flex;
			justify-content: center;
			color: $white;
			background: $dark-purple;
			border-radius: 50%;
			top: rem(-24);
			border: 4px solid $white;

			&::before {
				content: ' ';
				position: absolute;
				border-radius: 48px;
				width: 48px;
				height: 44px;
				top: rem(4);
				filter: blur(24px);
				background: $purple;
				z-index: -1;
			}
		}
	}
	&__title {
		font-weight: 600;
		font-size: rem(16);
		line-height: 150%;
		letter-spacing: -0.02em;
		text-align: center;
		color: $white;
	}
	&__text {
		font-weight: 500;
		font-size: rem(12);
		line-height: rem(15);
		letter-spacing: -0.02em;
		text-align: center;
		color: $white;
		margin-bottom: rem(45);
		margin-top: rem(12);
	}
	&__btn {
		background-color: $white;
		color: $dark-purple;
		height: 40px;
		&:hover {
			background-color: $light-blue;
		}
	}
}

@keyframes slideInRight {
	from {
		transform: translate3d(100%, 0, 0);
		visibility: visible;
	}

	to {
		transform: translate3d(0, 0, 0);
	}
}
</style>