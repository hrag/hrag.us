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

			// TODO - put this into a function of sorts
			// totalHeight = totalHeight + $(window).height() / 2;
			// $('.project__screenshot img').load(function() {
			// 	totalHeight += $(this).height()+39;
			// 	totalHeight = totalHeight;
			// 	$('.project__screenshots').css({'height': (totalHeight * .1)+'rem'});
			// });

			$('.project__footer__next-button').tap(function() {
				window.location.hash = 'project/'+nextProjId;
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
