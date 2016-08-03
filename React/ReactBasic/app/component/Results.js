var React = require('react');
var PropTypes = React.PropTypes;
function lol(obj){
	return <pre>{JSON.stringify(obj,2,'')}</pre>
}
function Results(props){
	return (
		<div> Results: {lol(props)} </div>
	)
}
module.exports = Results;