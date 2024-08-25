<script setup>


</script>


<template>
	<!-- <div class="main__container"> -->
		<aside class="sidebar">
			<div class="sidebar__logo">
				<img src="@/assets/images/logo.svg" alt="Logo">
			</div>
			<div class="sidebar__body">
				<div class="sidebar__navigation">
					<div @click="$router.push('/')" class="sidebar__link"><span class="_icon-overview"></span>Overview</div>
					<div class="sidebar__link"><span class="_icon-task"></span>Task</div>
					<div class="sidebar__link"><span class="_icon-mentors"></span>Mentors</div>
					<div class="sidebar__link"><span class="_icon-message"></span>Message</div>
					<div class="sidebar__link"><span class="_icon-settings"></span>Settings</div>
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
	<!-- </div> -->
</template>


<style lang='scss'>
@import '@/assets/scss/main.scss';

.sidebar {
	width: 252px;
	height: 100vh;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
	background-color: $white;

	&__logo {
		margin-bottom: rem(60);
		padding-top: rem(32);
	}
	&__body {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	&__navigation {
		display: flex;
		flex-direction: column;
		gap: rem(24);

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
	}
	&__item {
		&_circle-1 {
			position: absolute;
			width: rem(160);
			height: rem(160);
			border-radius: 50%;
			background-color:  rgba(255, 255, 255, 0.08);
			top: rem(-95);
			left: rem(-95);
		}
		&_circle-2 {
			position: absolute;
			width: rem(160);
			height: rem(160);
			border-radius: 50%;
			background-color:  rgba(255, 255, 255, 0.08);
			bottom: rem(-90);
			right: rem(-90);
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
		&:hover {
			background-color: $light-blue;
		}
	}
}
</style>