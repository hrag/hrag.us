###
authored by luke on 2/10/15
to compile this to js: coffee -c -b --no-header app_level.coffee
.. if you don't have coffee.. npm install -g coffee



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
###

###
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
###

class Controller
  constructor: (@name="base_controller", @methods={}) ->
    @view_data = {}
    @setup()

  setup: ->
    @method_names = []
    for key, method of @methods
      @method_names.push key

  template_name: (method) ->
    "#{@name}_#{method}_template"

  data: (key, val=null) ->
    if typeof(key) == "object"
      for k, v of key
        @view_data[k] = v
    else
      @view_data[key] = val

    @view_data

  update_page_meta: ->
    if @view_data.title?
      $("title").text @view_data.title

  render: (target=".body") ->
    return if !@current_method
      console.error "controller render called without method setup! should be invoked by router"

    $el = $ target
    tmpl = $("##{@template_name(@current_method_name)}")

    @update_page_meta()

    return if !$el.length
      console.error "target not found"

    return if !tmpl.length
      console.error "template not found"

    $el.empty()
    $el.html Mustache.render(tmpl.html(), @view_data)

  _handle: (route_name, wildcards={}) ->
    return if !@methods.hasOwnProperty(route_name)
      console.error "unhandled route for #{@name} controller: #{route_name}"

    console.log "#{@name} controller rendering route: #{route_name}"

    @current_method = @methods[route_name]
    @current_method_name = route_name

    if typeof(@current_method) == "function"
      @current_method.call @, wildcards
    else if typeof(@current_method) == "string"
      require [@current_method], (method) =>
        @current_method = method
        @current_method.call @, wildcards
    else
      console.error "route '#{route_name}' doesnt seem set up properly"
      false


###
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
###
class Router
  constructor: (@routes={}) ->
    @setup_routes()
    @setup_events()

  init: ->
    @handle_route @current_path()

  setup_routes: ->

  setup_events: ->
    window.addEventListener "hashchange", (e) =>
      @handle_route @current_path()

  current_path: ->
    "/" + window.location.hash.replace("#", "")

  path_pieces: ->
    @current_path.split("/")

  handle_route: (path) ->
    found = false
    wildcards = {}
    for key, route of @routes
      # console.log route.path, path
      if !found && route.path.indexOf(":") < 0 && route.path == path
        found = route
        break

    # no exact match found
    if !found
      # attempt wildcard match
      for key, route of @routes
        if !found && route.path.indexOf(":") > 0
          pieces = route.path.split(":")
          path_pieces = path.split("/")
          if path.indexOf(pieces[0]) == 0
            found = route
            for piece, i in pieces
              if i > 0
                wildcards[piece] = path_pieces[i]

            break

      # no wildcard match either
      if !found
        console.error "routing error for '#{path}'; no handler found"
        # look for a catchall path
        if @routes.hasOwnProperty("*")
          found = @routes["*"]
        # give up
        else
          return

    found.controller._handle found.name, wildcards

  get_route: (name, wildcards = {}) ->
    return if !@routes.hasOwnProperty(name)
      console.error "no route found with name: #{name}" 
    
    path = @routes[name].path

    for k, v of wildcards
      path.replace new RegExp(":#{k}", 'g'), v

    path







