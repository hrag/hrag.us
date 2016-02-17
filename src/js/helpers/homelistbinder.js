// helpers/homelistbinder.js

define([
	'jquery',
	'json!projects.json',
	'jquerymob'
	], 
function($, probject) {
	var returnedModule = function() {
		probject.forEach(function(proj) {
			var el = proj.id;
			$('#'+el).tap(function() {
				console.log('tapped #'+el);
				window.location.hash = 'project/'+el;
			});	
		});
	}
	return returnedModule;

});