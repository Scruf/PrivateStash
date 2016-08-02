var React = require('react');
var ReactDom = require('react-dom');
var axios = require('axios');
var HelloWorld = React.createClass({
	render: function(){
	return (
			<div>Hello World</div>
		)
	}
})
var Cars =  React.createClass({

	getInitialState: function(){
		return {
			cars:[]
		}
	},
	componentDidMount: function(){
		axios.get('http://localhost:8000/cars')
			.then(function (car){
				this.setState({
					cars:car.data
				})
			}.bind(this))
	},
	render: function(){
		console.log(this.state)
		return (
			<div> Cars</div>
		)
	}
})

ReactDom.render(
	<Cars  />,
	document.getElementById('app')
)
/*
axios.get('http://localhost:8000/cars')
		.then(function(cars){
			console.log(cars);
		})
		.catch(function(err){
			console.warn("Error "+err)
		})

*/