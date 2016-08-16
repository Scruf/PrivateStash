import React, { Component } from 'react';
import ReactDOM  from 'react-dom';

class SearchBar extends Component{
	constructor(props){
		super(props);
		this.state = {input_string:''};
	}
	render() {
		return (
			<div>
				<input onChange={this.onInputChange.bind(this)}/>;
				{this.state.input_string}
			</div>
		)
	}
	onInputChange(e){
	
		this.setState({input_string:e.target.value});
		console.log(this.state.input_string)
	}
}

export default SearchBar;