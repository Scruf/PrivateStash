import React, { Component } from 'react';
import ReactDOM  from 'react-dom';

class SearchBar extends Component{
	constructor(props){
		super(props);
		this.state = {input_string:'Woher'};
	}
	render() {
		return (
			<div>
				<input 	className="input_str" value={this.state.input_string} onChange={this.onInputChange.bind(this)}/>;
				{this.state.input_string}
			</div>
		)
	}
	onInputChange(e){
		this.setState({input_string:e.target.value});
	}
}

export default SearchBar;