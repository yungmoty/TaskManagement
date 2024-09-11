<script setup>
import { ref, computed } from 'vue'
import DrawerMenu from '@/components/DrawerMenu.vue';
import HeaderMenu from '@/components/HeaderMenu.vue';
import RecentMentors from '@/components/MentorsPageRecentMentors.vue';
import { useMentors } from "@/hooks/useMentors";


const { mentors } = useMentors()
const categoryOption = ref('')
const sortOption = ref('')
const searchQuerry = ref('')

const choiceOption = (category, sort, search) => {
	categoryOption.value = category
	sortOption.value = sort
	searchQuerry.value = search
}

const sortedMentors = computed(() => {
	if (sortOption.value === 'Deadline') {
		return [...mentors.value].sort((post1, post2) => post1.taskQuantity[0] - post2.taskQuantity[0])
	}
	if (sortOption.value === 'Popular') {
		return [...mentors.value].sort((post1, post2) => post2.rating - post1.rating)
	}
	if (categoryOption.value === 'Developer') {
		return [...mentors.value].filter(post => post.major.toLowerCase().includes(categoryOption.value.toLowerCase()))
	}
	if (categoryOption.value === 'Design') {
		return [...mentors.value].filter(post => post.major.toLowerCase().includes(categoryOption.value.toLowerCase()))
	}
	return mentors.value
})
const	sortedAndSearchedMentors = computed(() => {
	return sortedMentors.value.filter(post => post.name.toLowerCase().includes(searchQuerry.value.toLowerCase()))
})
</script>


<template>
	<div class="page">
		<DrawerMenu pageClass="mentors-page"/>
		<div class="page__content">
			<HeaderMenu 
				@send-option="choiceOption"
				pageClass="mentors-page"
				title="Explore Mentors"
				:isSearchBlock="true"
			/>
			<div class="page__common">
				<div class="page__recent-mentors">
					<RecentMentors
						:mentors="sortedAndSearchedMentors"
					/>
				</div>
				
				<div class="page__total-mentors">

				</div>
			</div>
		</div>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';

.page {
	height: 100vh;
	display: grid;
	grid-template-columns: 17.5% 1fr;
	&__content {
		background-color: $light-white;
		width: 1212px;
		margin: 0 auto;
	}
	&__common {

	}
	&__recent-mentors {
		padding: rem(32);
	}
	&__total-mentors {

	}
}


</style>