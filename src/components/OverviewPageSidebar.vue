<script setup>
import { ref } from 'vue'
import OverviewPageCalendar from '@/components/OverviewPageCalendar.vue';

</script>


<template>
	<aside class="sidebar-menu">
		<div class="sidebar-menu__calendar">
			<OverviewPageCalendar />
		</div>
		
		<div class="sidebar-menu__current-task curent-task">
			<div class="curent-task__header">
				<div class="curent-task__title"></div>
				<div class="curent-task__settings"></div>
			</div>
			<div class="curent-task__task"></div>
			<div class="curent-task__about">
				<div class="curent-task__detail">
					<div class="curent-task__subtitle"></div>
					<div class="curent-task__major"></div>
				</div>
				<ul class="curent-task__list">
					<li class="curent-task__item"></li>
					<li class="curent-task__item"></li>
					<li class="curent-task__item"></li>
				</ul>
			</div>
			<div class="curent-task__btn"></div>
		</div>
	</aside>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';

.sidebar-menu {
	background-color: $medium-white;
	padding: rem(32);
	&__calendar {
	}
	&__current-task {
	}
}
.curent-task {
	&__header {
	}
	&__title {
	}
	&__settings {
	}
	&__task {
	}
	&__about {
	}
	&__detail {
	}
	&__subtitle {
	}
	&__major {
	}
	&__list {
	}
	&__item {
	}
	&__btn {
	}
}

</style>