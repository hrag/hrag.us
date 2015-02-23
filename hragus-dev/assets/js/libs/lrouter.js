// libs/lrouter.js


/*
	Router
	The router handles passing hash routes to controller methods to render views.
	It's pretty much automatic after instantiation.

	Creating the router:
	router = new Router({
	   home: { path: "/", controller: home_controller, name: "index" },
	   exhibit: { path: "/exhibit", controller: home_controller, name: "exhibit" }
	});

	The paths should use '/' at the start even though the URL will start with '#'

	Once the app is ready to go, just call: router.init()
	The current hash will load by default and then any url change of the hash will
	trigger the router to attempt to handle the new path.
	 */


define([], function() {
 	'use strict';
	  
	function Router(routes) {
		this.routes = routes != null ? routes : {};
		this.setup_routes();
	this.setup_events();
	}

	Router.prototype.init = function() {
		return this.handle_route(this.current_path());
	};

	Router.prototype.setup_routes = function() {};

	Router.prototype.setup_events = function() {
		return window.addEventListener("hashchange", (function(_this) {
			return function(e) {
			return _this.handle_route(_this.current_path());
			};
		})(this));
	};


	Router.prototype.current_path = function() {
		return "/" + window.location.hash.replace("#", "");
	};


	Router.prototype.path_pieces = function() {
		return this.current_path.split("/");
	};

  Router.prototype.handle_route = function(path) {
    var found, i, key, path_pieces, piece, pieces, route, wildcards, _i, _len, _ref, _ref1;
    found = false;
    wildcards = {};
    _ref = this.routes;
    for (key in _ref) {
      route = _ref[key];
      if (!found && route.path.indexOf(":") < 0 && route.path === path) {
        found = route;
        break;
      }
    }
    if (!found) {
      _ref1 = this.routes;
      for (key in _ref1) {
        route = _ref1[key];
        if (!found && route.path.indexOf(":") > 0) {
          pieces = route.path.split(":");
          path_pieces = path.split("/");
          if (path.indexOf(pieces[0]) === 0) {
            found = route;
            for (i = _i = 0, _len = pieces.length; _i < _len; i = ++_i) {
              piece = pieces[i];
              if (i > 0) {
                wildcards[piece] = path_pieces[i];
              }
            }
            break;
          }
        }
        console.log(wildcards);
      }
      if (!found) {
        console.error("routing error for '" + path + "'; no handler found");
        if (this.routes.hasOwnProperty("*")) {
          found = this.routes["*"];
        } else {
          return;
        }
      }
    }
    return found.controller._handle(found.name, wildcards);
  };


	Router.prototype.get_route = function(name, wildcards) {
		var k, path, v;
		if (wildcards == null) {
			wildcards = {};
		}
		if (!this.routes.hasOwnProperty(name)) {
			return console.error("no route found with name: " + name);
		}
		path = this.routes[name].path;
		for (k in wildcards) {
			v = wildcards[k];
			path.replace(new RegExp(":" + k, 'g'), v);
		}
		return path;
	};

	return Router;

});