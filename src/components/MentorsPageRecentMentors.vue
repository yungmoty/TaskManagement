<script setup lang="ts">
import { ref, watch } from 'vue'
import SliderSwiper from '@/components/SliderSwiper.vue';
import { useI18n } from 'vue-i18n'
import { Mentor } from '@/interfaces/mentor';

// Типизация пропсов
const props = defineProps<{
	mentors: Mentor[]
}>()

const { t } = useI18n({useScope: 'global'})
const loading = ref<boolean>(false)
const slidesCountLimitTask = ref<number>(0);
	let timer: ReturnType<typeof setTimeout> | undefined

const startLoading = (): void => {
	if (timer) {
		clearTimeout(timer);
	}
	timer = setTimeout(() => {
		loading.value = true;
	}, 500);
};

watch(() => props.mentors, (mentors) => {
	slidesCountLimitTask.value = mentors.length;
});
watch(() => slidesCountLimitTask.value, () => {
	loading.value = false;
	startLoading();
});

</script>


<template>
	<SliderSwiper 
		nameSwiper="swiper4" 
		swiperBtn="swiper4-btn" 
		:sliderTitle="t('mentors.recentMentors.title')"
		:slidesCountLimitTask="slidesCountLimitTask"
	>
		<transition-group name="task-list">
			<div
				v-for="mentor in mentors"
				:key="mentor.id"
				class="swiper-slide recent-mentors"
			>
				<div class="recent-mentors__top">
					<div class="recent-mentors__main">
						<a @click.prevent href="" class="recent-mentors__avatar">
							<img :src="mentor.avatar" :alt="mentor.name">
						</a>
						<a @click.prevent href="" class="recent-mentors__info">
							<div class="recent-mentors__name">{{ mentor.name }}</div>
							<div class="recent-mentors__major">{{ mentor.major }}</div>
						</a>
					</div>
					<a 
						v-if="mentor.isFollow"
						href=""
						class="recent-mentors__followed"
						@click.prevent="mentor.isFollow = !mentor.isFollow"
					>
						Followed
					</a>
					<a
						v-if="!mentor.isFollow"
						href=""
						class="recent-mentors__follow"
						@click.prevent="mentor.isFollow = !mentor.isFollow"
					>
					+ Follow
					</a>
				</div>
				<div class="recent-mentors__bottom">
					<a 
						href="" 
						class="recent-mentors__task"
						@click.prevent
					>
						<span class="_icon-note"></span>
						{{ mentor.taskQuantity }} {{ $t('mentors.recentMentors.task') }}
					</a>
					<a 
						href="" 
						class="recent-mentors__reviews"
						@click.prevent
					>
						<span class="_icon-star"></span>
						{{ mentor.rating }} ({{ mentor.reviews }} {{ $t('mentors.recentMentors.reviews') }})
					</a>
				</div>
			</div>
		</transition-group>
	</SliderSwiper>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';

.swiper-slide {
	width: 328px;

	&:not(:last-child) {
		margin-right: 36px;
	}
}
.recent-mentors {
	background-color: $white;
	padding: rem(24);
	border-radius: rem(10);

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
			margin-bottom: rem(16);
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
	&__bottom {
		display: flex;
		justify-content: space-between;
		gap: rem(30);

		@media (max-width: 415px){
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

.task-list-item {
	display: inline-block;
	margin-right: 10px;
}
.task-list-enter-active,
.task-list-leave-active {
	transition: all 0.4s ease 0s;
}
.task-list-enter-from,
.task-list-leave-to {
	opacity: 0;
	transform: scale(0.1);
}
.task-list-move {
	transition: transform 0.4s ease 0s;
}
.task-list-leave-active {
	position: absolute;
}

</style>