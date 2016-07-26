var React = require('react');
function lol(obj){
	return <pre>{JSON.stringify(obj,null,' ')}</pre>
}
function Confirmbattle(props){
	console.log("Inside ConfirmBattle");
	return props.isLoading === true ? <p> Loading </p> : <div>{lol(props)}</div>
	
}

module.exports = Confirmbattle;