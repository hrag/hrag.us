// views/about.js


define([
	'jquery',
	'json!projects.json',
	'mustache',
	'helpers/before',
	'preload',
	'jquerymob'
], function($, probject, Mustache, Before) {
	return function(){
		var about = $('.about');
		var aboutWrapper = $('.about__wrapper');
		var footer = $('.footer');
		var aboutFooter = $('.about .footer');
		var galleryPic = $('.gallery__pic');
		var galleryPicCurrent = $('.gallery__pic__current');
		var galleryPath = '/public/img/gallery/';
		var navcloseback = $('.nav-closeback');
		var navmenu = $('.nav-menu');
		var pics = 28 // # pics +1
		var escKey = 27;

		var before = new Before('about');

		var galleryObj = function() {
			var galleryArr = [];
			for (i = 1; i < pics; i++) {
				if (i < 10) {
					i = '0'+i.toString();
				} else {
					i = i.toString();
				}
				galleryArr.push(i);
			}
			return galleryArr;
		}

		var formatPicNum = function(num) {
			numStr = num.toString();
			if (numStr.charAt(0) == '0') {
				return numStr;
			}
			if ((numStr > 0) && (numStr < 10)) {
				return '0'+numStr;
			} else {
				return numStr;
			}
		}

		function picLoader(picToLoad) {
			if (picToLoad == 0) {
				galleryPic.addClass('displaynone')
				about.removeClass('noverflow');
				navmenu.removeClass('displaynone')
				navcloseback.removeClass('displaynone');
				return;
			}
			picMover(picToLoad);
			navmenu.addClass('displaynone')
			navcloseback.addClass('displaynone');
			var oneLeft, oneRight;
			$.get(galleryPath+'lg'+picToLoad+'.jpg', function() {
				if (galleryPic.hasClass('displaynone')) {
					galleryPic.removeClass('displaynone');
					about.addClass('noverflow');
				}
				galleryPicCurrent.attr('src', galleryPath+'/lg'+picToLoad+'.jpg');
			}).done(function() {

				picToLoad = parseInt(picToLoad);
				var oneLeft = picToLoad - 1;
					oneLeft = formatPicNum(oneLeft);
				var oneRight = picToLoad + 1 
					oneRight = formatPicNum(oneRight);

				if (picToLoad == 1) {
					oneLeft = formatPicNum(pics-1)
				} else if (picToLoad == (pics-1)) {
					oneRight = formatPicNum(01);
				} 
				var leftlarge = (galleryPath+'lg'+oneLeft+'.jpg').toString();
				var rightlarge = (galleryPath+'lg'+oneRight+'.jpg').toString();
				var leftsmall = (galleryPath+'sm'+oneLeft+'.jpg').toString();
				var rightsmall = (galleryPath+'sm'+oneRight+'.jpg').toString();
				var leftRight = [
					leftlarge,
					rightlarge,
					leftsmall,
					rightsmall
				];
				$(leftRight).preload(function() {
					$('.gallery__nav--left').css({
						'background-image': 'url('+leftsmall+')'
					})
					$('.gallery__nav--right').css({
						'background-image': 'url('+rightsmall+')'
					})
				});
			});
		}

		function picMover(currentPic) {
			var backOne, forwardOne;
			var galleryGoLeft = $('.gallery__nav--left');
			var galleryGoRight = $('.gallery__nav--right');
			var galleryClose = $('.gallery__nav--close');
			galleryGoLeft.unbind('tap');
			galleryGoRight.unbind('tap');
			galleryPicCurrent.unbind('tap');

			currentPic = parseInt(currentPic);

			if (currentPic == 1) {
				backOne = formatPicNum(pics-1)
				forwardOne = formatPicNum(currentPic+1);

			} else if (currentPic == (pics-1)) {

				backOne = formatPicNum(currentPic-1);
				forwardOne = formatPicNum(01);

			}  else {

				backOne = formatPicNum(currentPic-1);
				forwardOne = formatPicNum(currentPic+1);

			}

			$(document).keyup(function(e) {
				if (e.keyCode == escKey) picLoader(0);
			});
			galleryClose.on('click', function(e) {
				picLoader(0)
			});
			galleryGoLeft.on('tap', function(e) {
				picLoader(backOne);
				e.preventDefault();
			});
			galleryGoRight.on('tap', function(e) {
				picLoader(forwardOne);
				e.preventDefault();
			});
			galleryPicCurrent.on('tap', function(e) {
				picLoader(forwardOne);
				e.preventDefault();
			})
			
		}

		function aboutSwitcher(section) {
			$('.about__content__section').addClass('displaynone');
			$('.about__content__'+section).removeClass('displaynone');
			$('.about__nav button').removeClass('selected');
			$('.about__nav button[data-about='+section+']').addClass('selected');
			if ($(window).width() > 799) {
				about.scrollTop($(window).height() - 80);
			} else {
				if (section != 'gallery') {
					console.log(section);
					about.scrollTop($(window).height());
				}
			}
		}

		$.get('/templates/about.html', function(template) {
			
			var theAbout = Mustache.render(template, galleryObj());
			aboutWrapper.append(theAbout);

			if ($(window).width() < 800) {
				var aboutEpic = ['/public/img/about-750x1335.jpg']
			} else {
				var aboutEpic = ['/public/img/about-1800x1220.jpg']

			}

			$(aboutEpic).preload(function() {
				about.removeClass('about--right').addClass('about--in-view');
			});
			$('.gallery__thumb').each(function() {
				var whichPic;
				$(this).on('click', function() {
					whichPic = $(this).data('pic');
					picLoader(whichPic);
				})
			})

			$('.about__nav button').each(function() {
				$(this).tap(function() {
					aboutSwitcher($(this).data('about'));
				})
			})

		}).done(function() {
		    //
		});
		
		

		if (aboutFooter.length < 1) {
			$.get('/templates/footer.html', function(template) {
				var theFooter = Mustache.render(template, {});
				about.append(theFooter);
				$('.footer').addClass('footerStretch');
			});
		}
			
	};
});
