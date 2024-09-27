<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useMentors } from "@/hooks/useMentors";

// Типизация пропсов
const props = defineProps<{
	sliderTitle: string,
	nameSwiper: string,
	swiperBtn: string,
	slidesCountNewTask?: number,
	slidesCountLimitTask?: number,
}>()

const { loading } = useMentors()

const nameSwiperSlider = props.nameSwiper
const swiperSliderBtn = props.swiperBtn
let swiperInstance: Swiper | null = null;
const swiperContainer = ref<HTMLElement | null>(null)


const keyboardFlip = (): void => {
	let isHovered = false

	swiperContainer.value?.addEventListener('mouseenter', () => { isHovered = true })

	swiperContainer.value?.addEventListener('mouseleave', () => { isHovered = false })
	

	document.addEventListener('keydown', (event: KeyboardEvent) => {
		if (isHovered && swiperInstance) {
			if (event.key === 'ArrowLeft') {
				swiperInstance.slidePrev();
			} else if (event.key === 'ArrowRight') {
				swiperInstance.slideNext();
			}
		}
	})
}

const updateSwiper = (): void => {
	const slidesPerViewOverviewPage = window.innerWidth <= 1150 ? 1 : 2
	const slidesPerViewTaskPage = window.innerWidth > 1024 ? 3 : window.innerWidth > 744 ? 2 : 1;

	const slidesCountNewTaskNext = props.slidesCountNewTask! > slidesPerViewTaskPage ? `.${swiperSliderBtn}.slider__btn-next` : null
	const slidesCountLimitTaskNext = props.slidesCountLimitTask! > slidesPerViewTaskPage ? `.${swiperSliderBtn}.slider__btn-next` : null
	const slidesCountNewTaskPrev = props.slidesCountNewTask! > slidesPerViewTaskPage ? `.${swiperSliderBtn}.slider__btn-prev` : null
	const slidesCountLimitTaskPrev = props.slidesCountLimitTask! > slidesPerViewTaskPage ? `.${swiperSliderBtn}.slider__btn-prev` : null

	// Удаляем старый экземпляр Swiper, если он существует
	if (swiperInstance) {
		swiperInstance.destroy(true, true)
		swiperInstance = null
	}

	const swiperConfig = {
		modules: [Navigation, Autoplay],
		navigation: {

			nextEl: nameSwiperSlider === 'swiper3' || nameSwiperSlider === 'swiper4'
			? slidesCountNewTaskNext || slidesCountLimitTaskNext
			: `.${swiperSliderBtn}.slider__btn-next`,

			prevEl: nameSwiperSlider === 'swiper3' || nameSwiperSlider === 'swiper4'
			? slidesCountNewTaskPrev || slidesCountLimitTaskPrev 
			: `.${swiperSliderBtn}.slider__btn-prev`,
			
		},
		slidesPerView: nameSwiperSlider === 'swiper3' || nameSwiperSlider === 'swiper4' ? slidesPerViewTaskPage : slidesPerViewOverviewPage,
		spaceBetween: 32,
		autoplay: nameSwiperSlider === 'swiper1' ? {
			delay: 3000,
			pauseOnMouseEnter: true,
		} : false,
	}
	// Создание нового экземпляра Swiper
	swiperInstance = new Swiper(`.${nameSwiperSlider}`, swiperConfig)
}


// Отслеживание изменений количества слайдов
watch(() => [props.slidesCountNewTask, props.slidesCountLimitTask], () => {
	updateSwiper()
}, { immediate: true })


onMounted(() => {
	updateSwiper()
	keyboardFlip()
	window.addEventListener('resize', updateSwiper)
})

onBeforeUnmount(() => {
	if (swiperInstance) {
		swiperInstance.destroy(true, true)
	}
	window.removeEventListener('resize', updateSwiper)
})
</script>


<template>
	<div class="slider">
		<div class="slider__header">
			<div class="slider__title">{{ sliderTitle }}</div>
			<div class="slider__navigation">
				<div :class="swiperBtn" class="slider__btn-prev _icon-arrow-down"></div>
				<div :class="swiperBtn" class="slider__btn-next _icon-arrow-down"></div>
			</div>
		</div>
		<div ref="swiperContainer" :class="nameSwiper" class="slider__swiper swiper">
			<div v-show="loading" class="slider__loading">
				<svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
					<circle fill="#546FFF" stroke="none" cx="6" cy="50" r="6">
						<animateTransform 
							attributeName="transform" 
							dur="1s" 
							type="translate" 
							values="0 15 ; 0 -15; 0 15" 
							repeatCount="indefinite" 
							begin="0.1"/>
					</circle>
					<circle fill="#546FFF" stroke="none" cx="30" cy="50" r="6">
						<animateTransform 
							attributeName="transform" 
							dur="1s" 
							type="translate" 
							values="0 10 ; 0 -10; 0 10" 
							repeatCount="indefinite" 
							begin="0.2"/>
					</circle>
					<circle fill="#546FFF" stroke="none" cx="54" cy="50" r="6">
						<animateTransform 
							attributeName="transform" 
							dur="1s" 
							type="translate" 
							values="0 5 ; 0 -5; 0 5" 
							repeatCount="indefinite" 
							begin="0.3"/>
					</circle>
				</svg>
			</div>
			<div v-show="!loading" class="swiper-wrapper">
				<slot></slot>
			</div>
		</div>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';


.slider {

	&__header {
		display: flex;
		justify-content: space-between;
		margin-bottom: rem(20);
	}
	&__title {
		font-size: rem(24);
		font-weight: 600;
		letter-spacing: -0.03em;
	}
	&__navigation {
		display: flex;
		font-size: rem(24);
		gap: rem(10);
		cursor: pointer;
		
	}
	&__btn-prev {
		transform: rotate(90deg);
		color: $purple;
		transition: all 0.3s ease 0s;

		&:hover {
			color: $dark-blue;
		}
	}
	&__btn-next {
		transform: rotate(-90deg);
		transition: all 0.3s ease 0s;

		&:hover {
			color: $dark-blue;
		}
	}
	&__loading {
	display: flex;
	align-items: center;
	justify-content: center;
	}
	&__swiper {
	}
}
.swiper {
}
.swiper-wrapper {
}
.swiper-slide {

}
svg{
padding-left: 30px;
width: 100px;
height: 100px;
}
</style>