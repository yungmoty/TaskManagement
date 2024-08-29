<script setup>
import { ref, onMounted } from 'vue'
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


onMounted(() => {
	const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],
  navigation: {
    nextEl: '.slider__btn-next',
    prevEl: '.slider__btn-prev',
  },
  slidesPerView: 2,
  spaceBetween: 32,

});
})

</script>


<template>
	<div class="slider">
		<div class="slider__header">
			<div class="slider__title"></div>
			<div class="slider__navigation">
				<div class="slider__btn-prev _icon-arrow-down"></div>
				<div class="slider__btn-next _icon-arrow-down"></div>
			</div>
		</div>
		<div class="slider__swiper swiper">
			<div class="swiper-wrapper">
							<!-- Slides -->
				<div class="swiper-slide">Slide 1</div>
				<div class="swiper-slide">Slide 2</div>
				<div class="swiper-slide">Slide 3</div>
				<div class="swiper-slide">Slide 4</div>
				<div class="swiper-slide">Slide 5</div>
				<div class="swiper-slide">Slide 6</div>
			</div>
		</div>
	</div>
</template>


<style lang='scss' scoped>
.slider__navigation {
	display: flex;
	font-size: 30px;
	cursor: pointer;
}
.slider__btn-next {
	transform: rotate(-90deg);
}
.slider__btn-prev {
	transform: rotate(90deg);
}
.swiper-slide {
	background-color: plum;
	height: 100px;
}
</style>