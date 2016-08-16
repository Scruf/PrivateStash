import React, { Component } from 'react';
import ReactDOM  from 'react-dom';

class SearchBar extends Component{
	constructor(props){
		super(props);
		this.state = {input_string:' '}
	}
	render() {
		return 	<input onChange={onInputChange}/>;
	}

	onInputChange(e){
		console.log(e.target.value);
	}
}

export default SearchBar;