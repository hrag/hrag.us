// libs/lroutecontroller.js

/*
	target example: 

	home = new Controller("home", {
	  index: function(){
	    this.data('title', 'home');
	    //create any other data stuff
	    this.render();
	  },
	  exhibit: function(){
	    this.render();
	  }
	});

	router = new Router({
	  home: { path: "/", controller: home_controller, name: "index" },
	  exhibit: { path: "/exhibit", controller: home_controller, name: "exhibit" }
	});

	router.init();
	 */

	/*
	Controller
	This class is used for storing methods that can reflect URLs
	The router knows how to interact with controllers to pipe paths
	to these methods.

	When creating a controller, 2 things are required
	name: the name of the controller, used for path creation
	methods: a hash of methods indexed by path name, containing a method to run

	Methods:
	methods have access to all controller methods, so you can add extra methods if
	you need to do something special. There are also some default methods such as
	data(key, val) which can set data to be pass to the view, which brings up render()
	which can be called to do render the view. Render assumes an element somewhere
	with the id of "{{controller_name}}_{{method_name}}_template". If not found it will
	error out. See the Router for hooking up these methods.

	example controller
	home_controller = new Controller("home", {
	   index: function(){
	     this.data('title', "The home page");
	     this.render();
	   }
	})
*/


define([], function() {
	'use strict';
	function Controller(name, methods) {
		this.name = name != null ? name : "base_controller";
		this.methods = methods != null ? methods : {};
		this.view_data = {};
		this.setup();
	}


	Controller.prototype.setup = function() {
		var key, method, _ref, _results;
		this.method_names = [];
		_ref = this.methods;
		_results = [];
		for (key in _ref) {
			method = _ref[key];
			_results.push(this.method_names.push(key));
		}
		return _results;
	};


	Controller.prototype.template_name = function(method) {
		return "" + this.name + "_" + method + "_template";
	};


	Controller.prototype.data = function(key, val) {
		var k, v;
		if (val == null) {
			val = null;
		}
		if (typeof key === "object") {
			for (k in key) {
				v = key[k];
				this.view_data[k] = v;
			}
		} else {
			this.view_data[key] = val;
		}
		return this.view_data;
	};

    Controller.prototype.update_page_meta = function() {
        if (this.view_data.title != null) {
            return $("title").text(this.view_data.title);
        }
    };

    Controller.prototype.render = function(target) {
        var $el, tmpl;
        if (target == null) {
            target = ".body";
        }
        if (!this.current_method) {
            return console.error("controller render called without method setup! should be invoked by router");
        }
        $el = $(target);
        tmpl = $("#" + (this.template_name(this.current_method_name)));
        this.update_page_meta();
        if (!$el.length) {
            return console.error("target not found");
        }
        if (!tmpl.length) {
            return console.error("template not found");
        }
        $el.empty();
        return $el.html(Mustache.render(tmpl.html(), this.view_data));
    };

  Controller.prototype._handle = function(route_name, wildcards) {
    if (wildcards == null) {
      wildcards = {};
    }
    if (!this.methods.hasOwnProperty(route_name)) {
      return console.error("unhandled route for " + this.name + " controller: " + route_name);
    }
    console.log("" + this.name + " controller rendering route: " + route_name);
    this.current_method = this.methods[route_name];
    this.current_method_name = route_name;
    if (typeof this.current_method === "function") {
      return this.current_method.call(this, wildcards);
    } else if (typeof this.current_method === "string") {
      return require([this.current_method], (function(_this) {
        return function(method) {
          _this.current_method = method;
          return _this.current_method.call(_this, wildcards);
        };
      })(this));
    } else {
      console.error("route '" + route_name + "' doesnt seem set up properly");
      return false;
    }
  };
	return Controller;
});