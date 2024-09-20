<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n({useScope: 'global'})
const props = defineProps({
	mentor: {
		type: Object,
		required: true,
	}
})

const isFollow = ref(props.mentor.isFollow)
const choiceFollow = () => {
	isFollow.value = !isFollow.value
}
</script>


<template>
	<div class="swiper-slide mentor">
		<div class="mentor__top">
			<div class="mentor__main">
				<a href class="mentor__avatar">
					<img :src="mentor.avatar" :alt="mentor.name">
				</a>
				<a href="" class="mentor__info">
					<div class="mentor__name">{{ mentor.name }}</div>
					<div class="mentor__major">{{ mentor.major }}</div>
				</a>
			</div>
				<a 
					v-if="isFollow"
					href=""
					class="mentor__followed"
					@click.prevent="choiceFollow"
				>
					{{ $t('overview.sliderMentors.followed') }}
				</a>
				<a
					v-if="!isFollow"
					href=""
					class="mentor__follow"
					@click.prevent="choiceFollow"
				>
				+ {{ $t('overview.sliderMentors.follow') }}
				</a>
		</div>
		<div class="mentor__bottom">
			<a 
				href="" 
				class="mentor__task"
			>
				<span class="_icon-note"></span>
				{{ mentor.taskQuantity }} {{ $t('overview.sliderMentors.task') }}
			</a>
			<a 
				href="" 
				class="mentor__reviews"
			>
				<span class="_icon-star"></span>
				{{ mentor.rating }} ({{ mentor.reviews }} {{ $t('overview.sliderMentors.reviews') }})
			</a>
		</div>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';

.mentor {
	background-color: $white;
	padding: rem(24);
	border-radius: rem(10);

	&__top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: rem(20);

		@media (max-width: 425px){
			align-items: flex-start;
			flex-direction: column;
		}
	}
	&__main {
		display: flex;
		@media (max-width: 425px){
			margin-bottom: rem(20);
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
	&__bottom {
		display: flex;
		justify-content: space-between;
		gap: rem(15);
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
</style>