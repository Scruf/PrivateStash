var React = require('react');

function Confirmbattle(props){
	console.log("Inside ConfirmBattle");
	return props.isLoading === true ? <p> Loading </p> : <p>Some random stuff I do not care about </p>
	
}

module.exports = Confirmbattle;