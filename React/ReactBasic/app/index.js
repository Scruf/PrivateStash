"use strict"
let GITHUB_DATA = {
	name:"Egor Kozitski",
	username:"Scruf",
	image: "https://avatars2.githubusercontent.com/u/7702355?v=3&s=460"
}

const React = require('react');
const ReactDom = require('react-dom');


let PROFILE_PIC = React.createClass({
	render: function(){
		return <img src={this.props.image} />
	}
});
let PROFILE_URL = React.createClass({
	render: function(){
		return(
			<div>
			<Link/>
				<a href={"https://github.com/"+this.props.username }>
					{this.props.username}
				</a>
			</div>

		)
	}
});
let Link = React.createClass({
	changeUrl: function(){
		window.location.replace(this.props.href)
	},
	render: function(){
		console.log(this.props.children);
		return (
			<span style={{
				color:"blue",
				cursor:"pointer"
			}}
			 onClick={this.changeUrl}>
				{this.props.children}
			</span>
		)
	}
})
let NAME_TAG = React.createClass({
	render: function(){
		return (
			<div>
				<Link href="some.com">
					{this.props.name}
				</Link>
			</div>
		)
	}
});
let Avatar = React.createClass({
	render: function(){
		return (
			<div>
				<PROFILE_PIC image= "https://avatars2.githubusercontent.com/u/7702355?v=3&s=460"/>
				<PROFILE_URL username={this.props.user.username}/>
				<NAME_TAG name={this.props.user.name} />
				
			</div>
		)
	}
})

ReactDom.render(
	<Avatar user={GITHUB_DATA}/>,
	document.getElementById('app')
);