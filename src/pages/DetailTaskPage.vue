<script setup>
import DrawerMenu from '@/components/DrawerMenu.vue';
import HeaderMenu from '@/components/HeaderMenu.vue';
import DetailTaskPageForm from '@/components/DetailTaskPageForm.vue';
import DetailTaskPageMain from '@/components/DetailTaskPageMain.vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n({useScope: 'global'})

</script>


<template>

<div class="page">
	<DrawerMenu pageClass="detail-task-page" />
		<div class="page__content">
			<HeaderMenu 
				:title="t('detailTask.titleHeader')"
				pageClass="detail-task-page"
			/>
			<div class="page__detail-task">
				<div class="page__main-content">
					<DetailTaskPageMain />
				</div>
				<div class="page__sidebar-content">
					<DetailTaskPageForm />
				</div>
			</div>
		</div>
</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';


.page {
	display: grid;
	grid-template-columns: 17% 1fr;
	height: 100vh;
	background-color: $light-white;
	
	@media (max-width: $l-dekstop){
		grid-template-columns: 1fr;
	}

	&__content {
	}
	&__detail-task {
		display: grid;
		grid-template-columns: 1fr auto;
		padding: rem(32);

		@media (max-width: $laptop){
			grid-template-columns: 1fr;
		}
		@media (max-width: 375px){
			padding: rem(22);
		}
	}
	&__main-content {
		background-color: $white;
		border-radius: rem(10);
		margin-right: rem(32);

		@media (max-width: $laptop){
			margin: 0;
		}
	}
	&__sidebar-content {
		width: 372px;
		background-color: $white;
		border-radius: rem(10);
		height: max-content;
		padding: rem(32);

		@media (max-width: $laptop){
			padding: rem(24);
			width: 100%;
		}
		@media (max-width: 375px){
			padding: rem(5);
		}
	}
}

</style>