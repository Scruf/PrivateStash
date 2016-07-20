var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var transperentBg = require('../styles').transperentBg;
var PromptContainer  = React.createClass({
	contextTypes:{
		router:React.PropTypes.object.isRequired
	},
	getInitialState: function(){
		return {
			username:''
		}
	},
	onUpdateUser: function(e){
		this.setState({
			username: e.target.value
		})
	},
	onSubmitUser: function(e){
		e.preventDefault();
		var username = this.state.username;
		console.log(username);
		this.setState({
			username:''
		});
		if (this.props.routeParams.playerOne){
				this.context.router.push({
					pathname:'/battle',
					query:{
						playerOne: this.props.routeParams.playerOne,
						playerTwo: this.state.username
					}
				})
		}else{
			this.context.router.push('/playerTwo/'+this.state.username)
		}

	},
	render: function(){
		return(
			<div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transperentBg}>
				<h1> {this.props.route.header}</h1>
					<div className="form-group">
						<form onSubmit={this.onSubmitUser}>
							<input
								className = "form-control"
								placeholder="Github Username"
								onChange={this.onUpdateUser}
								value={this.state.username}
								type="text"
							/>
							<div className="form-group col-sm-4 col-sm-offset-4">
						
							<button 
								className="btn btn-block btn-success"
								type="submit">
								Continue
							</button>
						
					</div>
						</form>

					</div>
					
			</div>
		)
	}
})


module.exports = PromptContainer;