// helpers/before.js

define([
	'jquery'
	], 
function($) {
	var hideNshow = function(section) {
		var about = $('.about');
		var aboutWrapper = $('.about__wrapper');
		var project = $('.project');
		var firstlook = $('.firstlook');
		var navcloseback = $('.nav-closeback');
		var navmenu = $('.nav-menu');
		var menu = $('.menu');

		if (section == 'about') {
			menu.addClass('displaynone');
			menu.html('');
			aboutWrapper.html('');
			navcloseback.removeClass('displaynone');
			navmenu.removeClass('displaynone');
			about.removeClass('about--right').addClass('about--in-view');
			project.addClass('project--right').removeClass('project--in-view');
			firstlook.addClass('noverlay');
		}
		if (section == 'project') {
			menu.addClass('displaynone');
			menu.html('');
			navcloseback.removeClass('displaynone close');
			navmenu.removeClass('displaynone');
			project.removeClass('project--right').addClass('project--in-view');
			about.addClass('about--right').removeClass('about--in-view');
			firstlook.addClass('noverlay');
		}
		if (section == 'firstlook') {
			menu.addClass('displaynone');
			menu.html('');
			navcloseback.addClass('displaynone');
			navmenu.removeClass('displaynone');
			firstlook.removeClass('noverlay');
			about.addClass('about--right').removeClass('about--in-view');
			project.addClass('project--right').removeClass('project--in-view');
		}
		if (section == 'menu') {
			menu.html('');
			navcloseback.addClass('displaynone');
			navmenu.addClass('displaynone');
		}
	}
	return hideNshow;

});