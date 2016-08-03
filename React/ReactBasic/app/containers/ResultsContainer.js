var React = require('react');
var Results = require('../component/Results');
var ResultsContainer = React.createClass({
	getInitialState: function (){
		return {
			isLoading:true,
			scores:[]
		}
	},
	componentDidMount: function(){
		console.log(this.props.location.state.playersInfo);
	},
	render: function(){
		console.log(this.state)
		return (
			<Results isLoading={this.state.isLoading} scores={this.state.scores}/>
		);
	}
});
module.exports = ResultsContainer;