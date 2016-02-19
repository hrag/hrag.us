// main.js

define([], function() {
	'use strict';
	require.config({
		baseUrl: '/js',
		paths: {
			jquery: 'libs/jquery.2.1.3',
			jquerymob: 'libs/jquery.mobile.custom.min',
			mustache: 'libs/mustache',
			text: 'libs/text.2.0.13',
			json: 'libs/json.0.4.0',
			lrouter: 'libs/lrouter',
			lroutercontroller: 'libs/lroutecontroller',
			menu: 'helpers/menu',
			preload: 'helpers/preload',
		}
	});
	require([
		'jquery',
		'lrouter',
		'lroutercontroller',
		'menu',
		'preload'
		],
		function($, Router, Controller, Menu) {

		$('.nav-closeback').click(function() {
			window.history.back();
		});

		$('.nav-menu').click(function() {
			new Menu();
		});


		// Controllers
		var home_controller = new Controller("home", {
			index: "views/home",
			not_found: "views/home/not_found",
			menu: "views/menu"
		});

		var project_controller = new Controller("project", {
			index: "views/project"
		});

		var about_controller = new Controller("about", {
			index: "views/about"
			// experience: function() {
			// 	console.log('experience');
			// },
			// personal: function() {
			// 	console.log('personal');
			// },
			// gallery: function() {
			// 	console.log('gallery');
			// }
		});

		var router = new Router({

			home: { path: "/", controller: home_controller, name: "index" },

			project: {path: "/project/:project_name", controller: project_controller, name: "index"},

			about: {path: "/about", controller: about_controller, name: "index"},

			menu: {path: "/menu", controller: home_controller, name: "menu"},
			"*": { path: "*", controller: home_controller, name: "not_found" }

		});
		router.init();
	});
});
