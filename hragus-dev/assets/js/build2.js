// build2.js 

({
    appDir: "../../",
    baseUrl: "assets/js",
    mainConfigFile: 'main.js',
    paths: {
		jquery: 'libs/jquery.2.1.3',
		jquerymob: 'libs/jquery.mobile.custom.min',
		mustache: 'libs/mustache',
		text: 'libs/text.2.0.13',
		json: 'libs/json.0.4.0',
		pace: 'libs/pace.1.0.2',
		buggyfill: 'libs/viewport-units-buggyfill',
		lrouter: 'libs/lrouter',
		lroutercontroller: 'libs/lroutecontroller',
		sixty: 'libs/60fps-scroll'
	},
    dir: "../../../hragus-prod",
    modules: [
        {
            name: "main"
        }
    ]

})

