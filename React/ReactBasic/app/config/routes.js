var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Main  = require('../component/Main');
var Home  = require('../component/Home');

var routes = (
	<Router >
		<Route path = '/' component={Main}>
		<IndexRoute component={Home} />
		</Route>
	</Router>

)
module.exports=routes;