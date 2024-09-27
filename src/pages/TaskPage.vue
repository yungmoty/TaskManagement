<script setup lang="ts">
import { ref, computed } from 'vue'
import DrawerMenu from '@/components/DrawerMenu.vue';
import HeaderMenu from '@/components/HeaderMenu.vue';
import TaskPageTimeLimit from '@/components/TaskPageTimeLimit.vue';
import TaskPageNewTask from '@/components/TaskPageNewTask.vue';
import { useTaskToday } from "@/hooks/useTaskToday";
import { useNewTasks } from "@/hooks/useNewTasks";
import { useI18n } from 'vue-i18n'
import { CategoryEnum } from '@/enums/categoryEnum';
import { SortEnum } from '@/enums/sortEnum';
import { NewTasks } from '@/interfaces/newTasks';
import { TaskToday } from '@/interfaces/taskToday';

const { t } = useI18n({useScope: 'global'})
const { tasksToday } = useTaskToday()
const { newTasks } = useNewTasks()


const categoryOption = ref<string>('')
const sortOption = ref<string>('')
const searchQuerry = ref<string>('')

// Функция для установки выбранных параметров
const choiceOption = (category: string, sort: string, search: string): void => {
	categoryOption.value = category
	sortOption.value = sort
	searchQuerry.value = search
}


// Вычисляемое свойство для сортировки задач на сегодня
const sortedTasksToday = computed(() => {
	const tasks = tasksToday.value as TaskToday[]

	if (sortOption.value === t(SortEnum.Deadline)) {
		return [...tasks].sort((post1, post2) => 
		parseInt(post1.timeLeft[0]) - parseInt(post2.timeLeft[0])
	)
	}
	if (sortOption.value === t(SortEnum.Popular)) {
		return [...tasks].sort((post1, post2) => 
		post2.progress - post1.progress
	)
	}
	if (categoryOption.value === t(CategoryEnum.Developer)) {
		return [...tasks].filter(post => 
		post.major.toLowerCase().includes(categoryOption.value.toLowerCase())
	)
	}
	if (categoryOption.value === t(CategoryEnum.Design)) {
		return [...tasks].filter(post => 
		post.major.toLowerCase().includes(categoryOption.value.toLowerCase())
	)
	}
	return tasks
})

// Вычисляемое свойство для сортировки новых задач
const sortedNewTasks = computed(() => {
	const tasks = newTasks.value as NewTasks[]

	if (sortOption.value === t(SortEnum.Deadline)) {
		return [...tasks].sort((post1, post2) => 
		parseInt(post1.timeLeft[0]) - parseInt(post2.timeLeft[0])
	)
	}
	if (sortOption.value === t(SortEnum.Popular)) {
		return [...tasks].sort((post1, post2) => 
		post2.progress - post1.progress
	)
	}
	if (categoryOption.value === t(CategoryEnum.Developer)) {
		return [...tasks].filter(post => 
		post.major.toLowerCase().includes(categoryOption.value.toLowerCase())
	)
	}
	if (categoryOption.value === t(CategoryEnum.Design)) {
		return [...tasks].filter(post => 
		post.major.toLowerCase().includes(categoryOption.value.toLowerCase())
	)
	}
	return tasks
})
const sortedAndSearchedNewTask = computed(() => {
	return sortedNewTasks.value.filter(post => post.titleImage.toLowerCase().includes(searchQuerry.value.toLowerCase()))
})
const sortedAndSearchedTasksToday = computed(() => {
	return sortedTasksToday.value.filter(post => post.titleImage.toLowerCase().includes(searchQuerry.value.toLowerCase()))
})
</script>


<template>
	<div class="page">
		<DrawerMenu pageClass="task-page" />
		<div class="page__content">
			<HeaderMenu 
				@send-option="choiceOption"
				:title="t('task.titleHeader')"
				pageClass="task-page"
				:isSearchBlock="true"
			/>
			<div class="page__task-limit">
				<TaskPageTimeLimit
					:tasksToday="sortedAndSearchedTasksToday"
				/>
			</div>
			<div class="page__new-task">
				<TaskPageNewTask 
					:newTasks="sortedAndSearchedNewTask"
				/>
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
	&__task-limit {
		padding: rem(32);
		@media (max-width: 425px){
			padding: rem(22);
		}
	}
	&__new-task {
		padding: 0 rem(32);
		@media (max-width: 425px){
			padding: 0 rem(22);
		}
	}
}

</style>