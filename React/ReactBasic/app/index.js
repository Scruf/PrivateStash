"use strict"
let GITHUB_DATA = {
	name:"Egor Kozitski",
	username: "Scruf",
	image: "https://avatars2.githubusercontent.com/u/7702355?v=3&s=460"
}

const React = require('react');
const ReactDom = require('react-dom');


let profile_pic = React.createClass({
	render: function(){
		return <img src={this.props.image} />
	}
});
let profile_url = React.createClass({
	render: function(){
		return(
			<div>
				<a href={"https://github.com/"+this.props.username }>
					{this.props.username}
				</a>
			</div>

		)
	}
});
let name = React.createClass({
	render: function(){
		return (
			<div>
				{this.props.name}
			</div>
		)
	}
});
let Avatar = React.createClass({
	render: function(){
		return (
			<div>
				<profile_pic image= "https://avatars2.githubusercontent.com/u/7702355?v=3&s=460"/>
				<profile_url username={this.props.user.username}/>
				<name name={this.props.user.name} />
			</div>
		)
	}
})

ReactDom.render(
	<Avatar user={GITHUB_DATA}/>,
	document.getElementById('app')
);