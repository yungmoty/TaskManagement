<script setup>
import { ref, onMounted } from 'vue';
import DrawerMenu from '@/components/DrawerMenu.vue';
import HeaderMenu from '@/components/HeaderMenu.vue';
import { useRoute } from 'vue-router';
import { useNewTasks } from '@/hooks/useNewTasks'; 

const route = useRoute();
const { fetchTaskById } = useNewTasks();
const task = ref(null);
const loadingTask = ref(true);

onMounted(async () => {
	const taskId = route.params.id;
	task.value = await fetchTaskById(taskId);
	loadingTask.value = false;
});

</script>


<template>

  <div class="page">
	<DrawerMenu></DrawerMenu>
		<div class="go">
			<HeaderMenu></HeaderMenu>
			<div v-if="loadingTask">Loading...</div>
			<div v-else-if="task">
			<img :src="task.image" :alt="task.titleImage">
			<h1>{{ task.titleImage }}</h1>
			<p>{{ task.major }}</p>
			<p>{{ task.progress }}%</p>
			<p>{{ task.timeLeft }}</p>
			<div class="task__contributors">
			<a v-for="(contributor, index) in task.contributors" :key="index" class="task__contributor">
				<img :src="contributor" alt="User">
			</a>
			</div>
			</div>
			<div v-else>Error loading task</div>
		</div>
	</div>
</template>


<style lang='scss' scoped>

.page {
	display: grid;
	grid-template-columns: 17.5% 1fr;
}
</style>