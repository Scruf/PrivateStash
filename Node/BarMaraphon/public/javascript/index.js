var HelloWorld = React.createClass({
	render: function(){
		return (
			<div>Hello World</div>
		)
	}
})
var LocationButton = React.createClass({
	render: function(){
		return (
			<div>
				<button className="btn btn-success">Get Set</button>
			</div>
		)
	}
})
var MainContainer = React.createClass({
	render: function(){
		return (
			<div className="container">
				<LocationButton />
			</div>
		)
	}
})

ReactDOM.render(
	<MainContainer />,
	document.getElementById('app')
);