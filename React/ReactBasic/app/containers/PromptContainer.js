var React = require('react');
var transperentBg = require('../styles').transperentBg;
var PromptContainer  = React.createClass({
	render: function(){
		return(
			<div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transperentBg}>
				<h1> {this.props.route.header}</h1>
					<div className="form-group">
						<form>
							<input
								className = "form-control"
								placeholder="Github Username"
								type="text"
							/>
						</form>
					</div>
					<div className="form-group col-sm-4 col-sm-offset-4">
						<button 
							className="btn btn-block btn-success"
							type="submit">
							Continue
						</button>
					</div>
			</div>
		)
	}
})


module.exports = PromptContainer;