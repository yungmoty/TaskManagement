<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({useScope: 'global'})
const countChecked = ref(1)
const selectedLanguage = ref('')

const languageSelection = ref([
	{name: 'English', value: 'en'},
	{name: 'Deutsch', value: 'de'},
])
const timezoneSelection = ref([
	{name: 'English', value: 'en'},
	{name: 'Deutsch', value: 'de'},
])

const selectedLanguageOption = (option) => {
	selectedLanguage.value = option
}

const switchLang = () => {
	locale.value = selectedLanguage.value
	localStorage.setItem('lang', locale.value)
}
</script>


<template>
	<div class="general">
		<div class="general__language">
			<h3 class="general__title-language general-title">{{ $t('settings.general.language') }}</h3>
			<USelect 
				@update:selectedOption="selectedLanguageOption"
				:selectList="languageSelection"
			/>
		</div>
		<div class="general__timezone">
			<h3 class="general__title-timezone general-title">{{ $t('settings.general.timeZone') }}</h3>
			<USelect :selectList="timezoneSelection"/>
		</div>
		<div class="general__timeformat">
			<h3 class="general__title-timeformat general-title">{{ $t('settings.general.timeFormat') }}</h3>
			<div class="general__radio-btns">
				<label for="hours-24" class="general__radio-btn" @click="countChecked = 1" :class="{checked : countChecked === 1}">
					<input id="hours-24" name="hours" type="radio" checked>
					<label for="hours-24" class="general__label">{{ $t('settings.general.h24') }}</label>
				</label>
				<label for="hours-12" class="general__radio-btn" @click="countChecked = 2" :class="{checked : countChecked === 2}">
					<input id="hours-12" name="hours" type="radio">
					<label for="hours-12" class="general__label">{{ $t('settings.general.h12') }}</label>
				</label>
			</div>
		</div>
		<UButton @click="switchLang" class="general__btn">{{ $t('settings.general.nameBtn') }}</UButton>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';

.general {
	display: flex;
	flex-direction: column;
	gap: rem(32);
	&__language {
	}
	&__title-language {
	}
	&__timezone {
	}
	&__title-timezone {
	}
	&__timeformat {
	}
	&__title-timeformat {
	}
	&__radio-btns {
		display: flex;
		flex-direction: row;
		gap: rem(32);
		margin-left: 1px;

		@media (max-width: $mobile-sec-inter){
			flex-direction: column;
			width: max-content;
		}
	}

	&__radio-btn {
		display: flex;
		align-items: center;
		position: relative;
		cursor: pointer;
		border: 1px solid $medium-white;
		padding: rem(15) rem(20);
		border-radius: 10px;
		transition: all 0.3s ease 0s;

		input[type="radio"] {
			opacity: 0;
			position: absolute;
			left: 100%;
		}
		&.checked {
			border: 1px solid $dark-blue;
		}

		.general__label {
			display: inline-flex;
			align-items: center;
			cursor: pointer;
			position: relative;
			padding-right: rem(85);
			font-size: rem(14);
			font-weight: 500;
			
			&::before {
				content: '';
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				width: rem(20);
				height: rem(20);
				border: 2px solid $medium-white;
				border-radius: 50%;
				background-color: #fff;
			}

			&::after {
				content: '';
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				width: rem(20);
				height: rem(20);
				border-radius: 50%;
				border: 6px solid $dark-blue;
				background-color: $white;
				opacity: 0;
				transition: opacity 0.3s ease;
			}
		}

		input[type="radio"]:checked + .general__label::after {
			opacity: 1;
		}
	}
	&__btn {
		max-width: 216px;
		font-size: 600;
		font-size: rem(14);
		line-height: 150%;
		margin-top: rem(32);
		transition: 0.5s;
		background-size: 200% auto;
		color: white;
		box-shadow: 0 0 20px #eee;
		background-image: linear-gradient(to right, $dark-blue 0%, #003CC5 51%, $dark-blue 100%);

		@media (any-hover: hover){
			&:hover {
				background-position: right center;
			}
		}
	}
}
.general-title {
	font-weight: 600;
	line-height: 150%;
	margin-bottom: rem(16);
}

</style>