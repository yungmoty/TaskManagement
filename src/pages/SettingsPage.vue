<script setup>
import { ref, watch, nextTick, computed, shallowRef } from 'vue';
import DrawerMenu from '@/components/DrawerMenu.vue';
import HeaderMenu from '@/components/HeaderMenu.vue';
import General from '@/components/SettingsPageGeneral.vue';
import Notification from '@/components/SettingsPageNotification.vue';
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({useScope: 'global'})
const currentTab = ref('general')
const sliderStyles = ref({})
const tabs = shallowRef({});

const updateTabs = () => {
	tabs.value = {
		general: {
			component: General,
			name: t('settings.general.name'),
		},
		notification: {
			component: Notification,
			name: t('settings.notification.name'),
		},
	};
};

updateTabs();

watch(locale, () => {
	updateTabs();
});
const tabNames = computed(() => Object.keys(tabs.value).map(key => ({
	key,
	name: tabs.value[key].name,
})));

watch(
	() => currentTab.value,
	async (newValue) => {
		
		await nextTick();
		
		const el = document.querySelector(`.settings__btns[data-tab="${newValue}"]`);
		
		if (el) {
			sliderStyles.value = {
			left: `${el.offsetLeft}px`,
			width: `${el.offsetWidth}px`,
			};
		} else {
			sliderStyles.value = {};
		}
	},
	{ immediate: true }
);
</script>


<template>
	<div class="page">
		<DrawerMenu pageClass="settings-page" />
		<div class="page__content">
			<HeaderMenu
			:title="t('settings.titleHeader')"
			pageClass="settings-page"
			/>

			<div class="page__settings settings">
				<div class="settings__wrapper">
					<div class="settings__header">
						<a
							href="#"
							class="settings__btns"
							v-for="tab in tabNames"
							:key="tab.key"
							:data-tab="tab.key"
							:class="['settings__btn', { active: currentTab === tab.key }]"
							@click.prevent="currentTab = tab.key"
						>
							{{ tab.name }}
						</a>
						<span class="settings__tabs-slider" :style="sliderStyles"></span>
					</div>
					<component :is="tabs[currentTab].component" class="settings__content"></component>
				</div>
			</div>
		</div>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';

.page {
	height: 100vh;
	display: grid;
	grid-template-columns: 16.5% 1fr;

	@media (max-width: $dekstop){
		grid-template-columns: 20.5% 1fr;
	}
	@media (max-width: 1100px){
		grid-template-columns: 26.5% 1fr;
	}
	@media (max-width: $laptop){
		grid-template-columns: 1fr;
	}

	&__content {
		background-color: $light-white;
		width: 1212px;
		margin: 0 auto;

		@include adaptiveValue(1212, 1, 1470, 'width');

		@media (max-width: $laptop){
			@include adaptiveValue(1024, 320, 1024, 'width');
		}
	}
	&__settings {
	}
}

.settings {
	padding: rem(42);


	@media (max-width: $laptop-inter){
		padding: rem(32);
	}
	@media (max-width: 425px){
		padding: rem(22);
	}

	&__wrapper {
		padding: rem(32);
		background-color: $white;
		border-radius: rem(10);
	}
	&__header {
		border-bottom: 1px solid $medium-white;
		width: 100%;
		display: flex;
		gap: rem(24);
		position: relative;
		margin-top: rem(20);
	}

	&__btns {
		line-height: 150%;
		letter-spacing: -0.02em;
		font-weight: 400;
		color: $light-purple;
		text-align: center;
		padding: 0 rem(12);
		padding-bottom: rem(12);


		&.active {
			color: $dark-purple;
			font-weight: 500;
		}
	}
	&__btn {

	}
	&__tabs-slider {
		position: absolute;
		height: 3px;
		background-color: $dark-blue;
		transition: all 0.3s;
		bottom: -2px;
		width: 100%;
	}
	&__content {
		padding: rem(32) 0 0 0;
	}
}

</style>