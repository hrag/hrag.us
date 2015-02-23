// helpers/insignia.js

define([
	'jquery',
], function($) {
	return bindInsignias = function() {
		var insigniaTopSquare = $('.loading #insignia__top-square');
		var insigniaBottomSquare = $('.loading #insignia__bottom-square');
		var insigniaLeftTriangle = $('.loading #insignia__left-triangle');
		var insigniaRightTriangle = $('.loading #insignia__right-triangle');

		var insigniaArr = [
			insigniaTopSquare,
			insigniaBottomSquare,
			insigniaLeftTriangle,
			insigniaRightTriangle
		];

		// $.each(insigniaArr, function() {
		// 	$(this).removeClass('out-of-view');
		// });

		// $('body').click(function() {
		// 	if (insigniaArr[0].hasClass('out-of-view')) {
		// 		$.each(insigniaArr, function() {
		// 			$(this).removeClass('out-of-view');
		// 		});
		// 	} else {
		// 		$.each(insigniaArr, function() {
		// 			$(this).addClass('out-of-view');
		// 		});
		// 	}
		// });

		return insigniaArr;
	}
});

