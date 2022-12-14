// BarChart.ts
import { defineComponent, h, PropType } from 'vue'
import { Area } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, AreaElement, CategoryScale, LinearScale, PluginOptionsByType } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, AreaElement, CategoryScale, LinearScale)

export default defineComponent({
	name: 'AreaChart',
	components: { Area },
	props: {
		chartId: {
			type: String,
			default: 'bar-chart'
		},
		width: {
			type: Number,
			default: 400
		},
		height: {
			type: Number,
			default: 400
		},
		cssClasses: {
			default: '',
			type: String
		},
		styles: {
			type: Object as PropType<Partial<CSSStyleDeclaration>>,
			default: () => { }
		},
		plugins: {
			type: Array as PropType<Plugin<'bar'>[]>,
			default: () => []
		}
	},
	setup(props) {
		const chartData = {
			labels: ['January', 'February', 'March'],
			datasets: [{ data: [40, 20, 12] }]
		}

		const chartOptions = { responsive: true }

		return () =>
			h(Area, {
				chartData,
				chartOptions,
				chartId: props.chartId,
				width: props.width,
				height: props.height,
				cssClasses: props.cssClasses,
				styles: props.styles,
				plugins: props.plugins
			})
	}
})
