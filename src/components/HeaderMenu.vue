<script setup>
import { ref } from 'vue'
import UInput from './UI/UInput.vue';

defineProps({
	title: String,
})

const task = ref('')
const isActiveSort = ref(false)
const isActiveCategory = ref(false)




const choiceSort = () => {
	isActiveSort.value = !isActiveSort.value
}
const choiceCategory = () => {
	isActiveCategory.value = !isActiveCategory.value
}

</script>


<template>
	<header class="header">
		<div class="header__top">
			<div class="header__content">
				<div class="header__title">{{ title }}</div>
				<slot></slot>
			</div>
			<div class="header__links">
				<a href="" class="header__notification _icon-notification"><span class="header__circle"></span></a>
				<a href="" class="header__user">
					<img src="@/assets/images/yungmoty.svg" alt="Profile">
				</a>
			</div>
		</div>
		<div class="header__bottom">
			<div class="header__search">
				<UInput 
					v-model="task"
					type="text" 
					placeholder="Search Task"
				/>
			</div>
			<div class="header__sorted">
				<div 
					@click="choiceCategory"
					:class="{ _active: isActiveCategory }"
					class="header__category sort-block">
					<span class="_icon-category"></span>Category
				</div>
				<div 
					@click="choiceSort"
					:class="{ _active: isActiveSort }"
					class="header__sort sort-block">
					<span class="_icon-sort"></span>
					Sort By {{ task }}
				</div>
			</div>
		</div>
	</header>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';

.header {

	&__top {
		display: flex;
		justify-content: space-between;
		padding: rem(32);
	}
	&__content {
		
	}
	&__title {
		font-weight: 600;
		font-size: rem(24);
		line-height: 150%;
		letter-spacing: -0.03em;
		color: $dark-purple;
	}
	&__links {
		display: flex;
		gap: rem(24);
	}
	&__notification {
		font-size: rem(22);
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $white;
		border: 1px solid #f5f5f7;
		border-radius: 50%;
		width: rem(52);
		height: rem(52);
		color: $light-purple;
		position: relative;
		transition: all 0.3s ease 0s;

		&:hover {
			background-color: $light-blue;
			color: $purple;
		}
	}
	&__circle {
			position: absolute;
			background-color: $red;
			height: rem(8);
			width: rem(8);
			border-radius: 50%;
			top: 30%;
			right: 30%;
		}
	&__user {

		img {
			width: rem(52);
			height: rem(52);
		}
	}
	&__bottom {
		display: flex;
		justify-content: space-between;
		gap: rem(24);
		padding: rem(32);
	}
	&__search {
	}
	&__sorted {
		display: flex;
		gap: rem(24);

	}
	&__category {

	}
	&__sort {
		display: flex;
	}
}

.sort-block {
	border: 1px solid #f5f5f7;
	border-radius: rem(10);
	padding: rem(14) rem(28);
	width: max-content;
	height: rem(52);
	display: flex;
	align-items: center;
	gap: rem(12);
	cursor: pointer;
	transition: all 0.3s ease 0s;
	
	span {
			font-size: rem(24);
			color: $light-purple;
		}

	&:hover {
		background-color: $light-blue;
	}
	&:hover ._icon-category {
		color: $purple;
		// transform: rotate(90deg);
	}
	&:hover ._icon-sort {
		color: $purple;
		// transform: scaleY(-1);
	}
	&:hover .header__icon span {
		background-color: $purple;
	}
}
._icon-notification {
	position: relative;
	transition: all 0.3s ease 0s;
}
._icon-category {
	transition: all 0.3s ease 0s;
}
._icon-sort {
	transition: all 0.3s ease 0s;
}
.header__category._active ._icon-category {
	transform: rotate(90deg);
}
.header__sort._active ._icon-sort {
	transform: scaleY(-1);
}

</style>