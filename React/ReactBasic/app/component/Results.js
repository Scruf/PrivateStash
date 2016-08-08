var React = require('react');
var PropTypes = React.PropTypes;
var UserDetails = require('./UserDetails');
var Loading = require('./Loading')
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var UserDetailsWrapper = require('./UserDetailsWrapper');
function  StartOver(){
	return (
			<div className="col-sm-12">
					<Link to='/playerOne'>
						<button type="button" className='btn btn-lg btn-danger'> Start Over</button>
					</Link>
				</div> 
	)
}
function Results(props){
	if(props.isLoading === true){
		return <Loading text="One Moment Please" speed={500} />
	}
	if (props.scores[0]===props.scores[1]){
		return(
			<div className="jumbotron col-sm-12 text-center">
				<h1> Its a tie</h1>
					<StartOver />
			</div>
		)
	}
	var winningIndex = props.scores[0] > props.scores[1] ? 0 : 1;
	var losingIndex = winningIndex === 0  ? 1 : 0; 
	return (
		<div className = "jumbotron col-sm-12 text-center">
			<h1> Results </h1>
				<div className = 'col-sm-8 col-sm-offset-2'>
					<UserDetailsWrapper header='Winner'>
						<UserDetails score={props.scores[winningIndex]} info={props.playersInfo[winningIndex]}/>
					</UserDetailsWrapper>
					<UserDetailsWrapper header='Loser'>
						<UserDetails score = {props.scores[losingIndex]} info={props.playersInfo[losingIndex]}/>
					</UserDetailsWrapper>

				</div>
				<div className="col-sm-12">
					<StartOver />
				</div>
		</div>
	)
}
module.exports = Results;