define(["mustache","helpers/insignia"],function(e,t){var n=$(".loading");$.get("/templates/loading.html",function(r){var i=e.render(r,{});n.append(i);var s=new t})});