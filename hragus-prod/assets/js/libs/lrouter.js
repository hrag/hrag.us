define([],function(){function e(e){this.routes=e!=null?e:{},this.setup_routes(),this.setup_events()}return e.prototype.init=function(){return this.handle_route(this.current_path())},e.prototype.setup_routes=function(){},e.prototype.setup_events=function(){return window.addEventListener("hashchange",function(e){return function(t){return e.handle_route(e.current_path())}}(this))},e.prototype.current_path=function(){return"/"+window.location.hash.replace("#","")},e.prototype.path_pieces=function(){return this.current_path.split("/")},e.prototype.handle_route=function(e){var t,n,r,i,s,o,u,a,f,l,c,h;t=!1,a={},c=this.routes;for(r in c){u=c[r];if(!t&&u.path.indexOf(":")<0&&u.path===e){t=u;break}}if(!t){h=this.routes;for(r in h){u=h[r];if(!t&&u.path.indexOf(":")>0){o=u.path.split(":"),i=e.split("/");if(e.indexOf(o[0])===0){t=u;for(n=f=0,l=o.length;f<l;n=++f)s=o[n],n>0&&(a[s]=i[n]);break}}console.log(a)}if(!t){console.error("routing error for '"+e+"'; no handler found");if(!this.routes.hasOwnProperty("*"))return;t=this.routes["*"]}}return t.controller._handle(t.name,a)},e.prototype.get_route=function(e,t){var n,r,i;t==null&&(t={});if(!this.routes.hasOwnProperty(e))return console.error("no route found with name: "+e);r=this.routes[e].path;for(n in t)i=t[n],r.replace(new RegExp(":"+n,"g"),i);return r},e});