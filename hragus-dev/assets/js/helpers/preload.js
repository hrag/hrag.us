// helpers/preloader.js


define([], function() {
	$.fn.preload = function(callback) {
    	$.each(this, function(i){
    		var imgUrl = this.toString();
    		$.get(imgUrl, function() {
    			$('<img/>')[0].src = imgUrl;
    		});
    	});
    	if (typeof callback == 'function') {
	        callback.call(this);
	    }
    }
});