//Create new Component and this componenet will produce some html
//Take this comonents and put it on the page (in the DOM)
import React, {Component} from 'react';
import SearchBar from './compnents/searchbar';
import ReactDOM from 'react-dom'
import VideoList from './compnents/video_list';
import YoutubeSearch  from 'youtube-api-search'
const API_KEY = "AIzaSyAhW_KXN86P6cTsP_uOEoQqefG4VVRoSjE";

class App extends Component {
	constructor(props){
		super(props);
		this.state = {video:[]};
		YoutubeSearch({key:API_KEY,term:'cats'},(data)=>{
			this.setState({video:data});
		});
	}
	render(){
		return (
			<div>
				 <SearchBar /> 
				 <VideoList videos={this.state.video} />
	 		</div>
		 );
	}	
}

ReactDOM.render(
	    <App/>,
		document.getElementById('container')
);