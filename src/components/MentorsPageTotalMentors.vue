<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Mentor } from '@/interfaces/mentor';

const { t } = useI18n({useScope: 'global'})

// Типизация пропсов
defineProps<{
	mentors: Mentor[]
}>()
</script>


<template>
	<div class="total-mentors">
		<div class="total-mentors__title">{{ $t('mentors.totalMentors.title') }}</div>
		<div class="total-mentors__body">
			<transition-group name="list">
			<div
				v-for="mentor in mentors.slice(0, 6)"
				:key="mentor.id"
				class="total-mentors__slides slides-mentors"
			>
			<div class="slides-mentors__top">
				<div class="slides-mentors__main">
					<a @click.prevent href="" class="slides-mentors__avatar">
						<img :src="mentor.avatar" :alt="mentor.name">
					</a>
					<a @click.prevent href="" class="slides-mentors__info">
						<div class="slides-mentors__name">{{ mentor.name }}</div>
						<div class="slides-mentors__major">{{ mentor.major }}</div>
					</a>
				</div>
				<a 
					v-if="mentor.isFollow"
					href=""
					class="slides-mentors__followed"
					@click.prevent="mentor.isFollow = !mentor.isFollow"
				>
				{{ $t('mentors.totalMentors.followed') }}
				</a>
				<a
					v-if="!mentor.isFollow"
					href=""
					class="slides-mentors__follow"
					@click.prevent="mentor.isFollow = !mentor.isFollow"
				>
				+ {{ $t('mentors.totalMentors.follow') }}
				</a>
			</div>
			<div class="slides-mentors__middle">
				{{ $t('mentors.totalMentors.aboutYourself') }} {{ mentor.name }}. {{ mentor.info }}...
			</div>
			<div class="slides-mentors__bottom">
				<a 
					href="" 
					class="slides-mentors__task"
					@click.prevent
				>
					<span class="_icon-note"></span>
					{{ mentor.taskQuantity }} 
				</a>
				<a 
					href="" 
					class="slides-mentors__reviews"
					@click.prevent
				>
					<span class="_icon-star"></span>
					{{ mentor.rating }} ({{ mentor.reviews }} {{ $t('mentors.totalMentors.reviews') }})
				</a>
			</div>
			</div>
		</transition-group>
		</div>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';


.total-mentors {
		&__title {
			font-weight: 600;
			font-size: rem(24);
			line-height: 150%;
			letter-spacing: -0.03em;
			margin-bottom: rem(18);
		}
		&__body {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			row-gap: rem(32);
			column-gap: rem(32);

			@media (max-width: 1170px){
				grid-template-columns: 1fr 1fr;
			}
			@media (max-width: $tablet){
				grid-template-columns: 1fr;
			}
		}
}

.slides-mentors {
	background-color: $white;
	padding: rem(24);
	border-radius: rem(10);
	display: flex;
	flex-direction: column;
	justify-content: space-between;


	&__top {
		display: flex;
		align-items: center;
		margin-bottom: rem(20);
		justify-content: space-between;

		@media (max-width: 425px){
			align-items: flex-start;
			flex-direction: column;
		}
		@media (max-width: 375px){
			margin-bottom: rem(6);
		}
	}
	&__main {
		display: flex;
		@media (max-width: 425px){
			margin-bottom: rem(20);
		}
		@media (max-width: 375px){
			margin-bottom: rem(14);
		}
	}
	&__avatar {
		img {
			width: rem(48);
			height: rem(48);
			border-radius: 50%;
			object-fit: cover;
		}
	}
	&__info {
		display: flex;
		flex-direction: column;
		margin-right: auto;
		margin-left: rem(8);
		transition: color 0.3s ease 0s;

		&:hover {
			color: $dark-blue;
		}
	}
	&__name {
		font-weight: 600;
	}
	&__major {
		font-size: rem(12);
		color: $purple;
	}
	&__followed {
		font-size: rem(14);
		color: $purple;
		transition: transform 0.3s ease 0s;
		&:hover {
			transform: scale(1.1);
		}
	}
	&__follow {
		font-size: rem(14);
		color: $dark-blue;
		transition: transform 0.3s ease 0s;
		&:hover {
			transform: scale(1.1);
		}
	}
	&__middle {
		font-size: rem(14);
		line-height: 200%;
		color: $light-purple;
		margin-bottom: rem(24);

		@media (max-width: 375px){
			margin-bottom: rem(16);
		}
		@media (max-width: 425px){
			font-size: rem(12);
		}
	}
	&__bottom {
		display: flex;
		justify-content: space-between;

		@media (max-width: 375px){
			flex-direction: column;
			gap: rem(15);
		}
	}
	&__task {
		font-size: rem(14);
		display: flex;
		gap: rem(8);
		transition: color 0.3s ease 0s;
		span {
			font-size: rem(24);
			color: $purple;
			transition: color 0.3s ease 0s;
		}
		&:hover {
			color: $dark-blue;
		}
		&:hover span {
			color: $dark-blue;
		}
	}
	&__reviews {
		font-size: rem(14);
		display: flex;
		gap: rem(8);
		transition: color 0.3s ease 0s;
		span {
			color: $yellow;
			font-size: rem(24);
		}
		&:hover {
			color: $dark-blue;
		}
	}
}

.list-move,
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: scale(0.1);
}


.list-leave-active {
	position: absolute;
}
</style>