// helpers/loading.js

define([
	'mustache',
	'helpers/insignia'
], function(Mustache, Insignia) {
	var loading = $('.loading');
	$.get('/templates/loading.html', function(template) {
		var loadingRender = Mustache.render(template, {});
		loading.append(loadingRender);
		var insigniaArr = new Insignia();
	});
});