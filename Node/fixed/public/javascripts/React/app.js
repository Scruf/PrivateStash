$.ajax({
	type:'GET',
	contentType:'application/json',
	url:'/project/details',
	success: function(data){
		console.log(data);
	}
})
var Container = React.createClass({
	render: function(){
		return (
			<div class="container">
				<UlContainer/>
			</div>
		)
	} 
});
var UlContainer = React.createClass({
	render: function(){
		return (
			<ul>
				<LiContainer />
			</ul>
		)
	}
})
var LiContainer = React.createClass({
	render: function(){
		return (
			<li>{this.props.project_name}  {this.props.project_price}</li>
			
		)
	}
})

ReactDOM.render(
	<Container pagename="text" />,
	 document.getElementById('content')
)