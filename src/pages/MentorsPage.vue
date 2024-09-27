<script setup lang="ts">
import { ref, computed } from 'vue'
import DrawerMenu from '@/components/DrawerMenu.vue';
import HeaderMenu from '@/components/HeaderMenu.vue';
import RecentMentors from '@/components/MentorsPageRecentMentors.vue';
import TotalMentors from '@/components/MentorsPageTotalMentors.vue';
import { useMentors } from "@/hooks/useMentors";
import { useI18n } from 'vue-i18n'
import { Mentor } from '@/interfaces/mentor';

const { t } = useI18n({useScope: 'global'})
const { mentors } = useMentors()
const categoryOption = ref<string>('')
const sortOption = ref<string>('')
const searchQuerry = ref<string>('')

const choiceOption = (category: string, sort: string, search: string): void => {
	categoryOption.value = category
	sortOption.value = sort
	searchQuerry.value = search
}

const sortedMentors = computed(() => {
	const mentorsArr = mentors.value as Mentor[]
	if (sortOption.value === 'Deadline') {
		return [...mentorsArr].sort((post1, post2) => 
		post1.taskQuantity - post2.taskQuantity
	)
	}
	if (sortOption.value === 'Popular') {
		return [...mentorsArr].sort((post1, post2) => 
		post2.rating - post1.rating
	)
	}
	if (categoryOption.value === 'Developer') {
		return [...mentorsArr].filter(post => 
		post.major.toLowerCase().includes(categoryOption.value.toLowerCase())
	)
	}
	if (categoryOption.value === 'Design') {
		return [...mentorsArr].filter(post => 
		post.major.toLowerCase().includes(categoryOption.value.toLowerCase())
	)
	}
	return mentorsArr
})
const sortedAndSearchedMentors = computed(() => {
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
				:title="t('mentors.titleHeader')"
				:isSearchBlock="true"
			/>
			<div class="page__common">
				<div class="page__recent-mentors">
					<RecentMentors
						:mentors="sortedAndSearchedMentors"
					/>
				</div>
				
				<div class="page__total-mentors">
					<TotalMentors
						:mentors="sortedAndSearchedMentors"
					/>
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
	grid-template-columns: 16.5% 1fr;

	@media (max-width: $dekstop){
		grid-template-columns: 1fr;
	}
	&__content {
		background-color: $light-white;
		width: 1212px;
		margin: 0 auto;

		@media (max-width: $l-dekstop) {
			@include adaptiveValue(1212, 200, 1470, 'max-width');
		}
		@media (max-width: 1300px) {
			padding-left: 20px;
		}
		@media (max-width: 1279px) {
			padding-left: 0;
		}
		@media (max-width: $dekstop) {
			@include adaptiveValue(1280, 300, 1280, 'min-width');
		}
		@media (max-width: $tablet) {
			@include adaptiveValue(744, 320, 744, 'max-width');
		}
		@media (max-width: 415px) {
			@include adaptiveValue(415, 320, 415, 'max-width');
		}
	}
	&__common {

	}
	&__recent-mentors {
		padding: rem(32);
		@media (max-width: 425px){
			padding: rem(22);
		}
	}
	&__total-mentors {
		padding: rem(32);
		@media (max-width: 425px){
			padding: rem(22);
		}
	}
}


</style>