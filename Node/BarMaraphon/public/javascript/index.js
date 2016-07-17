var HelloWorld = React.createClass({
	render: function(){
		return (
			<div>Hello World</div>
		)
	}
})
var Link = React.createClass({
	render: function(){
		<div>
			Something
		</div>
	}
})
var LocationButton = React.createClass({
	handleClick: function(){
		navigator.geolocation.getCurrentPosition(function(position){
			<Location>
				{this.props.children}
			</Location>
		})
	},
	render: function(){
		return (
			<div>
				<button className="btn btn-success" onClick={this.handleClick}>Get Set</button>
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