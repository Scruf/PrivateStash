$.ajax({
	type:'GET',
	contentType:'application/json',
	url:'/project/details',
	success: function(data){
		var data_list = data;
	
		var Container = React.createClass({
		render: function(){
			return (
				<div class="container">
					<UlContainer data={this.props.data}/>
				</div>
			)
		} 
	});
	var UlContainer = React.createClass({
		render: function(){
			var Ulproject = this.props.data.map(function(project){

				return (
					<LiContainer project_name={project.project_name} key={project._id}>{project.project_name}</LiContainer>
				);
			});
			return (
				<div className="foo">
					{Ulproject}
				</div>
			)
			
		}
	})
	var LiContainer = React.createClass({
		render: function(){
			return (
				<li>{this.props.project_name}</li>
			)
		}
	})

	ReactDOM.render(
		<Container data={data}/>,
	 	document.getElementById('content')
		)
	}
})
