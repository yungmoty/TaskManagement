<script setup>
import { ref } from 'vue'


defineProps({
	title: String,
	isSearchBlock: Boolean
})
const sortIcon = ref('_icon-sort')
const categoryIcon = ref('_icon-category')
const task = ref('')
const categoryArr = ref([
	'Developer',
	'Design',
	'None',
])
const sortArr = ref([
	'Popular',
	'Deadline',
	'None',
])


</script>


<template>
	<header class="header">
		<div class="header__top">
			<div class="header__content">
				<div class="header__title">{{ title }}</div>
				<slot></slot>
			</div>
			<div class="header__links">
				<UMiniButton class="_icon-notification">
					<span class="header__circle"></span>
				</UMiniButton>
				<a href="" class="header__user">
					<img src="@/assets/images/yungmoty.svg" alt="Profile">
				</a>
			</div>
		</div>
		<div v-if="isSearchBlock" class="header__bottom">
			<div class="header__search">
				<UInput 
					v-model="task"
					type="text" 
					placeholder="Search Task"
				/>
			</div>
			<div class="header__sorted">
				<UHeaderSelect 
					selectTitle="Category" 
					:iconClass="categoryIcon" 
					:selectArr="categoryArr"
				/>
				<UHeaderSelect 
					selectTitle="Sort By" 
					:iconClass="sortIcon" 
					:selectArr="sortArr"
					:isSort="true"
				/>
			</div>
		</div>
	</header>
	<div class="go">
		
	</div>

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
}
._icon-notification {
	position: relative;
	transition: all 0.3s ease 0s;
	font-size: rem(22);
}
</style>