var React = require('react');
var PropTypes = React.PropTypes;
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
function lol(obj){
	return <pre>{JSON.stringify(obj,null,' ')}</pre>
}
function Confirmbattle(props){
	console.log("Inside ConfirmBattle");
	return props.isLoading === true ? <p> Loading </p> :<div className="jumbotron col-sm-12 text-center">
			<h1>Confirm Players</h1>
				<div className="col-sm-8 col-sm-offset-2">
					<div className="col-sm-6">
						<p className="lead"> Player 1</p>
						{lol(props.playersInfo[0])}
					</div>
				<div className="col-sm-6">
					<p className="lead"> Player 2</p>
						Player 2 Info
						{lol(props.playersInfo[1])}
				</div>
				</div>
			<div className="col-sm-8 sol-sm-offset-2">
				<div className="col-sm-12">
					<button type="button" className="btn btn-lg btn-success" onClick={props.onInitiateBattle}>
						Initiate Battle
					</button>
				</div>
			<div className="col-sm-12">
				<Link to="/playerOne">
					<button type="button" className="btn btn-lg btn-danger"> Reselect Players</button>
				</Link>
			</div>
		</div>
		</div>
	
}


module.exports = Confirmbattle;