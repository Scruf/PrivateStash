var React = require('react');
var PropTypes = React.PropTypes;
var ReactRouter = require('react-router');
var UserDetails = require('./UserDetails');
var UserDetailsWrapper = require('./UserDetailsWrapper')
var Link = ReactRouter.Link;
function lol(obj){
	return <pre>{JSON.stringify(obj,null,' ')}</pre>
}
function Confirmbattle(props){
	console.log("Inside ConfirmBattle");
	return props.isLoading === true ? <p> Loading </p> :<div className="jumbotron col-sm-12 text-center">
			<h1>Confirm Players</h1>
				<div className="col-sm-8 col-sm-offset-2">
			
						<UserDetailsWrapper header="Player 1">
							<UserDetails info={props.playersInfo[0]} />
						</UserDetailsWrapper>
					
				
						
						<UserDetailsWrapper header="Player 2">
							<UserDetails info={props.playersInfo[0]} />
						</UserDetailsWrapper>
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