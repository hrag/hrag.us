// views/philosophy.js

define([
	'jquery',
	'json!projects.json'
	], 
	function($, probject) {
	return function(){ // add this
		var blah = {'test': probject};
		console.log(blah);
		return blah;
  	}; // and this
});