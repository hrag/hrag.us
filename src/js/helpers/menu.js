// helpers/menu.js

define([
	'jquery',
	'json!projects.json',
	'mustache',
	'helpers/insignia',
	'helpers/before'
], function($, probject, Mustache, Insignia, Before) {
	return function() {
		var menu = $('.menu');
		var navcloseback = $('.nav-closeback');
		var navmenu = $('.nav-menu');

		var before = new Before('menu');

		menu.removeClass('displaynone');

		$.get('/templates/menu.html', function(template) {

			var theMenu = Mustache.render(template, probject);
			menu.append(theMenu);

			$('.menu__navigation__home').click(function() {
				window.location = '/';
			});
			$('.menu__navigation__about').click(function() {
				window.location.hash = '#about';
			});
			$('.menu__navigation__resume').click(function() {
				window.location = '/resume/HragChanchanian-Resume.pdf';
			});
			$('.menu__navigation__close').click(function() {
				menu.addClass('displaynone');
				navmenu.removeClass('displaynone');
				if (window.location.hash == '') {
					navcloseback.addClass('displaynone');
				} else {
					navcloseback.removeClass('displaynone');
				}
			})

		}).done(function() {
		    //
		});
	}
});
