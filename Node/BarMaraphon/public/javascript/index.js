var HelloWorld = React.createClass({
	render: function(){
		return (
			<div>Hello World</div>
		)
	}
})

var Location = React.createClass({
	render: function(){
		<div>
			Something Cool
		</div>
	}
})
var LocationButton = React.createClass({
	handleClick: function(){
		navigator.geolocation.getCurrentPosition(function(position){
			console.log("Something");
			<Location/>
			
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