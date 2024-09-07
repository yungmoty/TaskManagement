<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useMentors } from "@/hooks/useMentors";

const { loading } = useMentors()

const props = defineProps({
	sliderTitle: String,
	nameSwiper: String,
	swiperBtn: String,
	slidesCountNewTask: Number,
	slidesCountLimitTask: Number,
})
const nameSwiperSlider = props.nameSwiper
const swiperSliderBtn = props.swiperBtn
let swiperInstance = null;
const swiperContainer = ref(null)


const keyboardFlip = () => {
	let isHovered = false

	swiperContainer.value.addEventListener('mouseenter', () => { isHovered = true })

	swiperContainer.value.addEventListener('mouseleave', () => { isHovered = false })
	

	document.addEventListener('keydown', (event) => {
		if (isHovered) {
			if (event.key === 'ArrowLeft') {
				swiperInstance.slidePrev();
			} else if (event.key === 'ArrowRight') {
				swiperInstance.slideNext();
			}
		}
	})
}

const updateSwiper = () => {
	const slidesPerViewOverviewPage = window.innerWidth <= 1150 ? 1 : 2
	const slidesPerViewTaskPage = window.innerWidth > 1024 ? 3 : window.innerWidth > 744 ? 2 : 1;



	if (swiperInstance) {
		swiperInstance.destroy(true, true)
		swiperInstance = null
	}

	const swiperConfig = {
		modules: [Navigation, Autoplay],
		navigation: {
			nextEl:
				props.slidesCountNewTask > slidesPerViewTaskPage ?`.${swiperSliderBtn}.slider__btn-next` : null
				||
				props.slidesCountLimitTask > slidesPerViewTaskPage ?`.${swiperSliderBtn}.slider__btn-next` : null,
			prevEl:
				props.slidesCountNewTask > slidesPerViewTaskPage ?`.${swiperSliderBtn}.slider__btn-prev` : null
				||
				props.slidesCountLimitTask > slidesPerViewTaskPage ?`.${swiperSliderBtn}.slider__btn-prev` : null,
		},
		slidesPerView: nameSwiperSlider === 'swiper3' || nameSwiperSlider === 'swiper4' ? slidesPerViewTaskPage : slidesPerViewOverviewPage,
		spaceBetween: 32,
		autoplay: nameSwiperSlider === 'swiper1' ? {
			delay: 3000,
			pauseOnMouseEnter: true,
		} : false,
	}
	swiperInstance = new Swiper(`.${nameSwiperSlider}`, swiperConfig)
};

onMounted(() => {
	updateSwiper()
	keyboardFlip()
	window.addEventListener('resize', updateSwiper)
});

onBeforeUnmount(() => {
	if (swiperInstance) {
		swiperInstance.destroy(true, true)
	}
	window.removeEventListener('resize', updateSwiper)
});

watch(() => [props.slidesCountNewTask, props.slidesCountLimitTask], () => {
	updateSwiper()
}, { immediate: true })

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
	// width: 752px;

	@media (max-width: $l-dekstop){
		// width: 805px;
	}
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