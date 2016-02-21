// views/project.js


define([
	'jquery',
	'json!projects.json',
	'mustache',
	'helpers/before',
	'jquerymob',
	'preload'
], function($, probject, Mustache, Before) {
	return function(){

		var projectWrapper = $('.project__wrapper');
		var project = $('.project');
		var projIndex;
		var totalHeight = 0;
		var projImgSrcs = [];
		var footer = $('.footer');
		var projectFooter = $('.project .footer');
		var whichProject = window.location.hash;
			whichProject = whichProject.split('/', 2);
			whichProject = whichProject[1].replace('#', '');

		var before = new Before('project');
		projectWrapper.html('');

		var computeNext = function(len, nextProj) {
			if (nextProj >= len) {
				nextProj = 0;
			}
			if (nextProj == len-1) {
				nextProj = 0;
			}
			return nextProj;
		}

		$.get('/templates/project.html', function(template) {

			var nextProjId;
			var probjectLength = probject.length;
			$.each(probject, function(i) {
				if (probject[i].id == whichProject) {
					projIndex = i;
					var nextProjIndex = (computeNext(probject.length, i+1));
					nextProjId = probject[nextProjIndex].id;
					var nextProjName = probject[nextProjIndex].name;
					probject[projIndex].nextId = nextProjId;
					probject[projIndex].nextName = nextProjName;
					if (i == probjectLength) {
						// do stuff
					}
				}
			});
			var theProject = Mustache.render(template, probject[projIndex]);
			// $.each(probject[projIndex].projectContents, function() {
			// 	projImgSrcs.push(this.src)
			// });

			// $(projImgSrcs).preload(function() {
				project.removeClass('project--right').addClass('project--in-view');
			// });

			projectWrapper.append(theProject);


			var screenshotLink = $('.project__screenshot__link');
			var screenshotLocale = $('.screenshot');
			screenshotLink.each(function() {
				var theLink = $(this).attr('href');
				$(this).click(function(e) {
					e.preventDefault();
					screenshotLocale.find('img').attr('src', theLink).removeClass('mobile_screenshot');
					console.log(theLink);
					if (theLink.indexOf('mob') > 0) {
						screenshotLocale.find('img').attr('src', theLink).addClass('mobile_screenshot');
					}
					screenshotLocale.find('img').attr('src', theLink);
					screenshotLocale.fadeIn(300);
					$(document).keyup(function(e){
					    if(e.keyCode === 27) {
					        screenshotLocale.fadeOut(300, function() {
								$(this).find('img').attr('src', '');
							});
						}
					});
					screenshotLocale.click(function() {
						$(this).fadeOut(300, function() {
							$(this).find('img').attr('src', '');
						});
					})
				});
			});


			$('.project__footer__next-button').tap(function() {
				window.location.hash = 'project/'+nextProjId;
				$('.project').animate({
					scrollTop: 0
				}, '300', 'swing');
			});

		}).done(function() {
		    // console.log(whichProject+" loaded");
		});

		if (projectFooter.length < 1) {
			$.get('/templates/footer.html', function(template) {
				var theFooter = Mustache.render(template, {});
				project.append(theFooter);
			});
		}

	};
});
