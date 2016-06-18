var Container = React.createClass({
	render: function(){
		return (
			<div class="container">
				<ul>
				</ul>
			</div>
		)
	} 
});


ReactDOM.render(
	<Container pagename="text" />,
	 document.getElementById('content')
)