define(["jquery","json!projects.json","mustache","helpers/insignia","helpers/before"],function(n,e,o,a,i){return function(){var a=n(".menu"),s=n(".nav-closeback"),c=n(".nav-menu");new i("menu");a.removeClass("displaynone"),n.get("/templates/menu.html",function(i){var t=o.render(i,e);a.append(t),n(".menu__navigation__home").click(function(){window.location="/"}),n(".menu__navigation__about").click(function(){window.location.hash="#about"}),n(".menu__navigation__resume").click(function(){window.location="/resume/HragChanchanian-Resume.pdf"}),n(".menu__navigation__close").click(function(){a.addClass("displaynone"),c.removeClass("displaynone"),""==window.location.hash?s.addClass("displaynone"):s.removeClass("displaynone")})}).done(function(){})}});