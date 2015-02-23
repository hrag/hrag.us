// Filename: app.js

// define([
// 	'jquery',
// 	'jquerymob',
// 	'router',
// ], function($, Router){
// 	var initialize = function(){
// 		// Pass in our Router module and call it's initialize function
// 		Router.initialize();
// 	}

// 	return {
// 		initialize: initialize
// 	};
// });








/*
$(function () {
// Declarations

	var hwindow = $(window);
	var hbody = $('body');
	var escKey = 27;

	var resobject = {};
	var probject; // Project-Object

	$(window).on('hashchange', function() {
		hashHandler();
	});

	// var isSafari = navigator.vendor.indexOf("Apple")==0 && /\sSafari\//.test(navigator.userAgent); // true or false
	// if (isSafari) headerimage.addClass('ixnayZoom');


	$(['/assets/images/hrag-circle.png', '/assets/images/aboutbg.jpg']).preload();
	
	$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = this;
    });


	function hashHandler() {
		if (window.location.hash.length > 0) {
			var theHash = window.location.hash;
				theHash = theHash.split("-");
			var simplifiedHash = theHash[0].substring(1);
			if (simplifiedHash == 'about') {
				showAbout();
				hideDrawer();
				hideDrawerBtn();
			} else {
				showProject(simplifiedHash);
			}
			
		} else {
			hbody.removeClass('noscroll');
			history.pushState("", document.title, window.location.pathname);
			destroyProject();
			destroyAbout();
			showDrawerBtn();
		}
	}
	aboutcta.tap(function() {
		window.location.hash = 'about';
	});



// Populate initiial project list on load
	$.getJSON('assets/json/projects.json', function(projectData, textStatus, jqXHr) {
		var reqs = 8; // # of projects
			reqs -= 1; // # of projects - 1
		$.each(projectData, function(i) {
			$.get('/templates/'+resobject.projListTemp, function(template) {
			    probject = projectData;
			    var html = Mustache.to_html(template, projectData[i]);
			    $('#row-wrapper').append(html);

			}).done(function() {
				if (i >= reqs) {
					bindRows()
				}
			});

		});
	});

// Bind each project row
	function bindRows() {
		var rowcontainer = $('.row-container');
		rowcontainer.tap(function(){
			thisRow = $(this).attr('id');
			window.location.hash = thisRow+'-project';
		});
		hashHandler()
	}


)};




*/
