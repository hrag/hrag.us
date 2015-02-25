// main.js

define([], function() {
	'use strict';
	require.config({
		baseUrl: '/assets/js',
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
		}
	});
	require([
		'jquery',
		'lrouter', 
		'lroutercontroller',
		'pace',
		'buggyfill',
		'sixty'
		], 
		function($, Router, Controller, Pace, Buggyfill) {

		Buggyfill.init();

		Pace.start({
			restartOnRequestAfter: false
		});

		$('.nav-closeback').click(function() {
			window.history.back();
		})

		$('.nav-menu').click(function() {
			window.location.hash = "#menu";
		});

		// $(window).load(function() {
		// 	console.log('loaded');
		// });

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

// Current
// Why isn't new lib stuff showing up on dev??


// TODOs (no order)


// robots.text
// Get rid of background-attachment: fixed;
// Lightbox for project screenshots desktop
// Weird zoom on IE11 & IE10 + project lists showing up one column. Might be a windows issue (broken in FF)
// LinkedIn is one word
// Check out weight on my name on the landing page
// Add left/right key support in gallery
// Base64 SVG Insignia
// Project page background bug
// Add insigina to footer
// Add menu
// Make resume
// Smooth Scroll everywhere
// Nice transitions for about
// Use translate instead of positioning for about and project
// Gallery full-width on desktop, max-width on the images to 25rem (or 30?)
// Move menu to helper
// Loading state




