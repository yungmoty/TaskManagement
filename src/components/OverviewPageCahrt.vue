<script setup lang="ts">
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });

// Создание или получение тултипа
const getOrCreateTooltip = (chart: Chart): HTMLElement => {
	let tooltipEl = chart.canvas.parentNode?.querySelector('div') as HTMLElement;

	if (!tooltipEl) {
		tooltipEl = document.createElement('div');
		Object.assign(tooltipEl.style, {
			background: '#141522',
			borderRadius: '10px',
			color: '#fff',
			fontSize: '14px',
			lineHeight: '150%',
			letterSpacing: '-0.02em',
			fontWeight: '600',
			opacity: '1',
			pointerEvents: 'none',
			position: 'absolute',
			transform: 'translate(-50%, -135%)',
			transition: 'all .3s ease',
		});

		const table = document.createElement('table');
		table.style.margin = '0px';
		tooltipEl.appendChild(table);
		chart.canvas.parentNode?.appendChild(tooltipEl);
	}

	return tooltipEl;
};

// Обработчик внешнего тултипа
const externalTooltipHandler = (context: any) => {
	const { chart, tooltip } = context;
	const tooltipEl = getOrCreateTooltip(chart);

	if (tooltip.opacity === 0) {
		tooltipEl.style.opacity = '0';
		return;
	}

	if (tooltip.body) {
		const titleLines = tooltip.title || [];
		const bodyLines = tooltip.body.map((b: any) => b.lines);

		const tableRoot = tooltipEl.querySelector('table') as HTMLTableElement;
		tableRoot.innerHTML = ''; // Очистка предыдущего содержимого

		const tableHead = document.createElement('thead');
		titleLines.forEach((title: any) => {
			const tr = document.createElement('tr');
			const th = document.createElement('th');
			th.appendChild(document.createTextNode(title));
			tr.appendChild(th);
			tableHead.appendChild(tr);
		});
		tableRoot.appendChild(tableHead);

		const tableBody = document.createElement('tbody');
		bodyLines.forEach((body: any) => {
			const tr = document.createElement('tr');
			const td = document.createElement('td');
			td.appendChild(document.createTextNode(body));
			tr.appendChild(td);
			tableBody.appendChild(tr);
		});
		tableRoot.appendChild(tableBody);
	}

	const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
	tooltipEl.style.opacity = '1';
	tooltipEl.style.left = positionX + tooltip.caretX + 'px';
	tooltipEl.style.top = positionY + tooltip.caretY + 'px';
	tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

onMounted(() => {
	const ctx = document.getElementById('myChart')?.getContext("2d") as CanvasRenderingContext2D;
	const gradient = ctx.createLinearGradient(50, 30, 50, 150);
	gradient.addColorStop(0, 'rgba(84, 111, 255, 0.2)');
	gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');

	Chart.defaults.font.size = 12;
	Chart.defaults.font.weight = 500;
	Chart.defaults.color = '#141522';
	Chart.defaults.font.family = 'PlusJakartaSans';

	new Chart(ctx, {
		type: 'line',
		data: {
			labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
			datasets: [{
				data: [1, 1.8, 1.1, 2.5, 1.5, 2, 1.8, 3],
				borderWidth: 4,
				backgroundColor: gradient,
				fill: true,
				pointBorderWidth: 0,
				pointHoverRadius: 2,
				pointHoverBorderWidth: 9,
				pointRadius: 7,
				pointBackgroundColor: 'rgba(0,0,0,0)',
				pointHitRadius: 10,
				lineTension: 0.4,
				pointBorderColor: '#546FFF',
				borderColor: '#141522',
			}],
		},
		options: {
			maintainAspectRatio: false,
			responsive: true,
			plugins: {
				legend: false,
				tooltip: {
					padding: 10,
					callbacks: {
						title: () => '',
						label: (context) => {
							let label = new Intl.NumberFormat('en-US', {
								minimumFractionDigits: 0,
								maximumFractionDigits: 0
							}).format(context.formattedValue);
							return label + ' ' + t('overview.chart.task');
						},
					},
					enabled: false,
					external: externalTooltipHandler
				},
			},
			scales: {
				x: {
					grid: {
						display: true
					},
					border: {
						display: false,
					},
				},
				y: {
					grid: {
						display: false
					},
					ticks: {
						stepSize: 1,
					},
					border: {
						display: false,
					},
				},
			},
		}
	});
});
</script>



<template>
	<canvas id="myChart"></canvas>
</template>


<style lang='scss' scoped>

</style>