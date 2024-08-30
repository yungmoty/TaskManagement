<script setup>
import { ref, onMounted } from 'vue'
import Swiper from 'swiper';
import { Navigation, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';

defineProps({
	sliderTitle: String,
})
onMounted(() => {
	const swiper = new Swiper('.swiper', {
		modules: [Navigation, Autoplay, Keyboard],
		navigation: {
			nextEl: '.slider__btn-next',
			prevEl: '.slider__btn-prev',
		},
		slidesPerView: 2,
		spaceBetween: 32,
		keyboard: true,
		autoplay: {
			delay: 1500,
			pauseOnMouseEnter: true,
		}
	});
})

import { useMentors } from "@/hooks/useMentors";
const {loading} = useMentors()
</script>


<template>
	<div class="slider">
		<div class="slider__header">
			<div class="slider__title">{{ sliderTitle }}</div>
			<div class="slider__navigation">
				<div class="slider__btn-prev _icon-arrow-down"></div>
				<div class="slider__btn-next _icon-arrow-down"></div>
			</div>
		</div>
		<div class="slider__swiper swiper">
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