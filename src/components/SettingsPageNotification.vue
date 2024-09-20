<script setup>
import { ref } from 'vue'

</script>


<template>
	<div class="notification">
		<div class="notification__switch">
			<input type="checkbox" name="message" id="message" checked>
			<label for="message" class="notification__label">{{ $t('settings.notification.setup-1') }}</label>
		</div>
		<div class="notification__switch">
			<input type="checkbox" name="task-update" id="task-update">
			<label for="task-update" class="notification__label">{{ $t('settings.notification.setup-2') }}</label>
		</div>
		<div class="notification__switch">
			<input type="checkbox" name="task-deadline" id="task-deadline" checked disabled>
			<label for="task-deadline" class="notification__label">{{ $t('settings.notification.setup-3') }}</label>
		</div>
		<div class="notification__switch">
			<input type="checkbox" name="mentor-help" id="mentor-help" disabled>
			<label for="mentor-help" class="notification__label">{{ $t('settings.notification.setup-4') }}</label>
		</div>
		<UButton class="notification__btn">{{ $t('settings.notification.nameBtn') }}</UButton>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';

.notification {
	display: flex;
	flex-direction: column;
	gap: rem(24);

	&__switch {
		input {
			display: none;
		}
	}
	&__label {
		font-weight: 600;
		line-height: 150%;
		position: relative;
		padding-left: 80px;
		cursor: pointer;
		user-select: none;
		transition: all 150ms ease-in-out;

		&:before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 60px;
			height: 35px;
			background-color: $white;
			border-radius: 200px;
			transition: inherit;
			border: 1px solid $medium-white;
		}
		&:after {
			content: '';
			position: absolute;
			left: 6px;
			top: 1px;
			width: 25px;
			height: 25px;
			background-color: $medium-white;
			border-radius: 200px;
			transition: inherit;
		}
	}
	&__btn {
		max-width: 216px;
		font-size: 600;
		font-size: rem(14);
		line-height: 150%;
		margin-top: rem(40);
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

.notification__switch input:checked ~ .notification__label:before {
	background-color: #001AFF;
}

.notification__switch input:checked ~ .notification__label:after {
	left: 28px;
}

.notification__switch input:active ~ .notification__label:after {
	width: 40px;
}

.notification__switch input:checked:active ~ .notification__label:after {
	left: 17px;
}

.notification__switch input:disabled ~ .notification__label {
	pointer-events: none;
}

.notification__switch input:disabled ~ .notification__label::after {
	opacity: .5;
}

.notification__switch input:disabled ~ .notification__label::after {
	opacity: .5;
}
</style>