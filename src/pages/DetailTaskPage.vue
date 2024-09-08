<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useNewTasks } from '@/hooks/useNewTasks'; 
import DrawerMenu from '@/components/DrawerMenu.vue';
import HeaderMenu from '@/components/HeaderMenu.vue';

const route = useRoute();
const { fetchTaskById } = useNewTasks();
const task = ref(null);
const loadingTask = ref(true);
const formattedDate = ref('');

const formatDate = () => {
	const now = new Date();

	formattedDate.value = format(now, 'd MMMM yyyy', { locale: enUS });
};

onMounted(async () => {
	const taskId = route.params.id;
	task.value = await fetchTaskById(taskId);
	loadingTask.value = false;

	formatDate();
});




</script>


<template>

  <div class="page">
	<DrawerMenu pageClass="detail-task-page" />
		<div class="page__content">
			<HeaderMenu 
				title="Detail Task"
				pageClass="detail-task-page"
			/>
			<div v-if="loadingTask">Loading...</div>
			<div v-else-if="task" class="page__detail-task detail-task">
				<div class="detail-task__main-content main-content">
					<div class="main-content__video">
						<img :src="task.image" :alt="task.titleImage">
					</div>
					<div class="main-content__all">
						<div class="main-content__top">
							<div class="main-content__title">{{ task.titleImage }}</div>
							<div class="main-content__major">
								{{ task.major }}. Apps Design 
								<span class="main-content__line"></span>
								<a href="" class="main-content__mentors">+ Get Mentors</a>
							</div>
							<div class="main-content__total">
								<div class="main-content__students">
									<span class="_icon-users"></span>200 Students Involved
								</div>
								<div class="main-content__time">
									<span class="_icon-clock"></span>{{ task.timeLeft }}
								</div>
							</div>
						</div>
						<div class="main-content__middle">
							<div class="main-content__subtitle-middle subtitle">Description</div>
							<div class="main-content__text">
								Follow the video tutorial above. Understand how to use each tool in the Figma application. Also learn how to make a good and correct design. Starting from spacing, typography, content, and many other design hierarchies. Then try to make it yourself with your imagination and inspiration.
							</div>
						</div>
						<div class="main-content__bottom">
							<div class="main-content__subtitle-bottom subtitle">Essence of Assessment</div>
							<ul class="main-content__list">
								<li class="main-content__item">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#546FFF" />
										<path d="M10.5799 15.5801C10.3799 15.5801 10.1899 15.5001 10.0499 15.3601L7.21994 12.5301C6.92994 12.2401 6.92994 11.7601 7.21994 11.4701C7.50994 11.1801 7.98994 11.1801 8.27994 11.4701L10.5799 13.7701L15.7199 8.6301C16.0099 8.3401 16.4899 8.3401 16.7799 8.6301C17.0699 8.9201 17.0699 9.4001 16.7799 9.6901L11.1099 15.3601C10.9699 15.5001 10.7799 15.5801 10.5799 15.5801Z" fill="white" />
									</svg>
									Understanding the tools in Figma
								</li>
								<li class="main-content__item">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#546FFF" />
										<path d="M10.5799 15.5801C10.3799 15.5801 10.1899 15.5001 10.0499 15.3601L7.21994 12.5301C6.92994 12.2401 6.92994 11.7601 7.21994 11.4701C7.50994 11.1801 7.98994 11.1801 8.27994 11.4701L10.5799 13.7701L15.7199 8.6301C16.0099 8.3401 16.4899 8.3401 16.7799 8.6301C17.0699 8.9201 17.0699 9.4001 16.7799 9.6901L11.1099 15.3601C10.9699 15.5001 10.7799 15.5801 10.5799 15.5801Z" fill="white" />
									</svg>
									Understand the basics of making designs
								</li>
								<li class="main-content__item">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#546FFF" />
										<path d="M10.5799 15.5801C10.3799 15.5801 10.1899 15.5001 10.0499 15.3601L7.21994 12.5301C6.92994 12.2401 6.92994 11.7601 7.21994 11.4701C7.50994 11.1801 7.98994 11.1801 8.27994 11.4701L10.5799 13.7701L15.7199 8.6301C16.0099 8.3401 16.4899 8.3401 16.7799 8.6301C17.0699 8.9201 17.0699 9.4001 16.7799 9.6901L11.1099 15.3601C10.9699 15.5001 10.7799 15.5801 10.5799 15.5801Z" fill="white" />
									</svg>
									Designing a mobile application using figma
								</li>
								<li class="main-content__item">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#546FFF" />
										<path d="M10.5799 15.5801C10.3799 15.5801 10.1899 15.5001 10.0499 15.3601L7.21994 12.5301C6.92994 12.2401 6.92994 11.7601 7.21994 11.4701C7.50994 11.1801 7.98994 11.1801 8.27994 11.4701L10.5799 13.7701L15.7199 8.6301C16.0099 8.3401 16.4899 8.3401 16.7799 8.6301C17.0699 8.9201 17.0699 9.4001 16.7799 9.6901L11.1099 15.3601C10.9699 15.5001 10.7799 15.5801 10.5799 15.5801Z" fill="white" />
									</svg>
									Presenting the design flow
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="detail-task__sidebar-content sidebar-content">
					<div class="sidebar-content__assigned">Assigned Assignments</div>
					<div class="sidebar-content__top">
						<div class="sidebar-content__title">{{ task.titleImage }}</div>
						<div class="sidebar-content__major">{{ task.major }}. Apps Design </div>
					</div>
					<div class="sidebar-content__middle">
						<div class="sidebar-content__subtitle-middle subtitle-folder">Detail Student</div>
						<ul class="sidebar-content__detail-student">
							<li class="sidebar-content__option">
								<p class="sidebar-content__quality">Student's name</p>
								<p class="sidebar-content__name">Dennis Nzioki</p>
							</li>
							<li class="sidebar-content__option">
								<p class="sidebar-content__quality">Student Class</p>
								<p class="sidebar-content__name">MIPA 2</p>
							</li>
							<li class="sidebar-content__option">
								<p class="sidebar-content__quality">Student Number</p>
								<p class="sidebar-content__name">10</p>
							</li>
						</ul>
					</div>
					<div class="sidebar-content__bottom">
						<div class="sidebar-content__subtitle-bottom subtitle-folder">File Task</div>
						<div class="sidebar-content__option">
							<p class="sidebar-content__quality">Last Modified</p>
							<p class="sidebar-content__name">{{ formattedDate }}</p>
						</div>
						<div class="sidebar-content__submission">File submissions</div>
					</div>
					<div class="sidebar-content__file">
						<span class="sidebar-content__icon _icon-folder-open"></span>
					</div>
					<p class="sidebar-content__alert">*drag or browser from device</p>
					<UButton class="sidebar-content__btn">
						Submit
					</UButton>
				</div>
			</div>
		</div>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';


.page {
	display: grid;
	grid-template-columns: 17.5% 1fr;
	&__content {
	}
	&__detail-task {
	}
}
.detail-task {
	display: grid;
	grid-template-columns: 1fr auto;
	column-gap: rem(32);
	background-color: $light-white;
	padding: rem(32);

	&__main-content {
		background-color: $white;
		border-radius: rem(10);
	}
	&__sidebar-content {
		width: 372px;
		background-color: $white;
		border-radius: rem(10);
		height: max-content;
	}
}
.main-content {
	&__video {
		height: 360px;

		img {
			width: 100%;
			height: 100%;
			border-radius: rem(10);
		}
	}
	&__all {
		padding: rem(24);
	}
	&__top {
		display: flex;
		flex-direction: column;
		gap: rem(16);
		margin-bottom: rem(32);
	}
	&__title {
		font-weight: 600;
		font-size: rem(32);
		letter-spacing: -0.03em;
	}
	&__major {
		font-size: rem(14);
		color: $purple;
		display: flex;
	}
	&__line {
		padding: 1px;
		background-color: #dfdfdf;
		border-radius: rem(10);
		margin: 0 rem(10);
	}
	&__mentors {
		color: $blue;
		transition: transform 0.3s ease 0s;

		&:hover {
			transform: translate(15px);
		}
	}
	&__total {
		display: flex;
		font-size: rem(14);
		gap: rem(20);
		
		span {
			color: $purple;
			margin-right: rem(5);
		}
	}
	&__students {
	}
	&__time {
	}
	&__middle {
		margin-bottom: rem(24);
	}
	&__subtitle-middle {
	}
	&__text {
		font-size: rem(14);
	}
	&__bottom {
	}
	&__subtitle-bottom {
	}
	&__list {
		display: flex;
		flex-direction: column;
		gap: rem(20);
	}
	&__item {
		display: flex;
		line-height: 200%;
		align-items: center;
	}
}
.subtitle {
	font-size: rem(24);
	font-weight: 600;
	margin-bottom: rem(16);
	letter-spacing: -0.03em;
}
.sidebar-content {
	padding: rem(24);

	&__assigned {
		font-weight: 600;
		font-size: rem(14);
		margin-bottom: rem(24);
	}
	&__top {
		margin-bottom: rem(24);
	}
	&__title {
		font-size: rem(24);
		font-weight: 600;
		letter-spacing: -0.03em;
		margin-bottom: rem(12);
	}
	&__major {
		font-size: rem(14);
		color: $purple;
	}
	&__middle {
		margin-bottom: rem(24);
	}
	&__subtitle-middle {
	}
	&__detail-student {
		display: flex;
		flex-direction: column;
		gap: rem(20);
	}
	&__option {
		display: flex;
		justify-content: space-between
	}
	&__quality {
		font-size: rem(14);
		color: $purple;
	}
	&__name {
		font-size: rem(14);
	}
	&__bottom {
		margin-bottom: rem(16);
	}
	&__subtitle-bottom {
	}
	&__submission {
		font-size: rem(14);
		color: $purple;
	}
	&__file {
		width: 100%;
		height: 160px;
		border: 1px dashed $dark-blue;
		border-radius: rem(10);
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	&__icon {
		font-size: rem(32);
		color: $light-blue;
	}
	&__alert {
		font-weight: 400;
		font-size: rem(12);
		letter-spacing: -0.01em;
		color: $purple;
		margin-top: rem(12);
		margin-bottom: rem(60);
	}
	&__btn {
		font-size: rem(14);
		
	}
}
.subtitle-folder {
	font-size: rem(20);
	font-weight: 600;
	margin-bottom: rem(20);
}


</style>