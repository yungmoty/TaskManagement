<script setup>
import { ref, computed } from 'vue'
import DrawerMenu from '@/components/DrawerMenu.vue';
import HeaderMenu from '@/components/HeaderMenu.vue';
import TaskPageTimeLimit from '@/components/TaskPageTimeLimit.vue';
import TaskPageNewTask from '@/components/TaskPageNewTask.vue';


import { useTaskToday } from "@/hooks/useTaskToday";
import { useNewTasks } from "@/hooks/useNewTasks";
const { tasksToday } = useTaskToday()
const { newTasks } = useNewTasks()




const categoryOption = ref('')
const sortOption = ref('')
const searchQuerry = ref('')

const choiceOption = (category, sort, search) => {
	categoryOption.value = category
	sortOption.value = sort
	searchQuerry.value = search
}

const sortedTasksToday = computed(() => {
	if (sortOption.value === 'Deadline') {
		return [...tasksToday.value].sort((post1, post2) => post1.timeLeft[0] - post2.timeLeft[0])
	}
	if (sortOption.value === 'Popular') {
		return [...tasksToday.value].sort((post1, post2) => post2.progress - post1.progress)
	}
	if (categoryOption.value === 'Developer') {
		return [...tasksToday.value].filter(post => post.major.toLowerCase().includes(categoryOption.value.toLowerCase()))
	}
	if (categoryOption.value === 'Design') {
		return [...tasksToday.value].filter(post => post.major.toLowerCase().includes(categoryOption.value.toLowerCase()))
	}
	return tasksToday.value
})
const sortedNewTasks = computed(() => {
	if (sortOption.value === 'Deadline') {
		return [...newTasks.value].sort((post1, post2) => post1.timeLeft[0] - post2.timeLeft[0])
	}
	if (sortOption.value === 'Popular') {
		return [...newTasks.value].sort((post1, post2) => post2.progress - post1.progress)
	}
	if (categoryOption.value === 'Developer') {
		return [...newTasks.value].filter(post => post.major.toLowerCase().includes(categoryOption.value.toLowerCase()))
	}
	if (categoryOption.value === 'Design') {
		return [...newTasks.value].filter(post => post.major.toLowerCase().includes(categoryOption.value.toLowerCase()))
	}
	return newTasks.value
})
const	sortedAndSearchedNewTask = computed(() => {
	return sortedNewTasks.value.filter(post => post.titleImage.toLowerCase().includes(searchQuerry.value.toLowerCase()))
})
const	sortedAndSearchedTasksToday = computed(() => {
	return sortedTasksToday.value.filter(post => post.titleImage.toLowerCase().includes(searchQuerry.value.toLowerCase()))
})
</script>


<template>
	<div class="page">
		<DrawerMenu />
		<div class="page__content">
			<HeaderMenu 
				@send-option="choiceOption"
				title="Explore Task"
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
	display: grid;
	grid-template-columns: 17.5% 1fr;
	&__content {
		background-color: $light-white;
		max-width: 1212px;
	}
	&__task-limit {
		padding: rem(32);
	}
	&__new-task {
		padding: 0 rem(32);
	}
}

</style>