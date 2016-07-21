var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var PromptConatiner = require('../containers/PromptContainer');
var ConfirmBattleContainer = require('../containers/ConfirmBattleContainer');
var Main  = require('../component/Main');
var Home  = require('../component/Home');
var routes = (
	<Router history={ReactRouter.hashHistory}>
		<Route path = '/' component={Main}>
			<IndexRoute component={Home} />
			<Route path='playerOne' header="Player One" component={PromptConatiner}/>
			<Route path='playerTwo/:playerOne' header="Player Two" component={PromptConatiner}/>
			<Route path='battle' component={ConfirmBattleContainer} />
		</Route>
	</Router>
);

module.exports=routes;