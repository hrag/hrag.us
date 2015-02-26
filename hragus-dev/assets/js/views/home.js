// views/home.js

define([
	'jquery',
	'json!projects.json',
	'mustache',
	'helpers/homelistbinder',
	'helpers/insignia',
	'helpers/before'
], function($, probject, Mustache, Binder, Insignia, Before) {
	return function(){
		var chromeHeight;
		var project = $('.project');
		var projectWrapper = $('.project__wrapper');
		var headerTopWrapper = $('.header__top-wrapper');
		var listWrapper = $('.list__wrapper');

		var before = new Before('firstlook');

		// project.removeClass('project--in-view').addClass('project--right');
		setTimeout(function() {
			projectWrapper.html('')
		}, 500);

		if (headerTopWrapper.html().length < 1) {
			$.get('/templates/homeheader.html', function(template) {
				var header = Mustache.render(template, {});
				headerTopWrapper.html('');
				headerTopWrapper.append(header);

				var insigniaArr = new Insignia();

				$('.header__navigation__projects').click(function() {
					if ($(window).width() < 800) {
						var winHeight = window.screen.height;
						window.scrollTo(0, winHeight);
					} else {
						$('.firstlook').animate({
							scrollTop: $(window).height()
						}, 667);
					}
				});
				$('.header__navigation__about').tap(function() {
					window.location.hash = 'about';
				});
				$('.header__navigation__resume').tap(function() {
					$.get('/public/resume/HragChanchanian-Resume.pdf', function(data) {
						window.location = '/public/resume/HragChanchanian-Resume.pdf';
					});
				})

			});
		}
		if (listWrapper.html().length < 1) {
			$.get('/templates/homelist.html', function(template) {
			    var html = Mustache.render(template, {probject: probject});
			    listWrapper.append(html);

			}).done(function() {
				chromeHeight = $('.header').height();
			    $('.list').css({'top': chromeHeight+'px'});
			    $(window).resize(function() {
					chromeHeight = $('.header').height();
			    	console.log('resized');
			    	$('.list').css({'top': chromeHeight+'px'});
			    });
			    var homeListBinder = new Binder();
			});
		}
			
	
	};
});

