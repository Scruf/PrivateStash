var React = require('react');
var ReactDom = require('react-dom');
var axios = require('axios');
var HelloWorld = React.createClass({
	render: function(){
		axios.get('http://localhost:8000/cars')
		.then(function(cars){
			console.log(cars);
		})
		.catch(function(err){
			console.warn("Error "+err)
		})
		return (
			<div>Hello World</div>
		)
	}
})
var Car =  React.createClass({

	getInitialState: function(){
		return {
			cars:[]
		}
	},
	render: function(){
		return (
			<div> Cars</div>
		)
	}
})

ReactDom.render(
	<HelloWorld />,
	document.getElementById('app')
)