"use strict"
const React = require('react');
const ReactDom = require('react-dom');


let HelloWorld = React.createClass({
	render: ()=>{
		return (
			<div> Hello World</div>
		)
	}
})
ReactDom.render(
	<HelloWorld />,
	document.getElementById('app')
);