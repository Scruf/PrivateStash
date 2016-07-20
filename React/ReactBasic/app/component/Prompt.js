var React = require('react');
var PropTypes = React.PropTypes;
var transperentBg = require('../styles').transperentBg;
var Prompt = React.createClass({
	render: function(){

		return (
				<div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transperentBg}>
				<h1> {this.props.header}</h1>
					<div className="form-group">
						<form onSubmit={this.props.onSubmitUser}>
							<input
								className = "form-control"
								placeholder="Github Username"
								onChange={this.props.onUpdateUser}
								value={this.props.username}
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
module.exports = Prompt;