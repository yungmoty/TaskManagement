let temp

const directives = [
	{name: 'temp', component: temp},
]

export default {
	install(app) {
		directives.forEach(({name, component}) => {
			app.component(name, component)
		})
	}
}