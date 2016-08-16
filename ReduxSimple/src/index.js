//Create new Component and this componenet will produce some html
//Take this comonents and put it on the page (in the DOM)
import React from 'react';
import SearchBar from './compnents/searchbar';
import ReactDOM from 'react-dom'
const API_KEY = "AIzaSyAhW_KXN86P6cTsP_uOEoQqefG4VVRoSjE";

const App = ()=>{
	return <div> <SearchBar /> </div>
}

ReactDOM.render(
	    <App/>,
		document.getElementById('container')
);