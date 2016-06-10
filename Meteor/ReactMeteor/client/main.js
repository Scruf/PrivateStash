import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import React from 'react'
import {render} from 'react-dom';
import '../imports/ui/body.js'
import App from '../imports/ui/app.jsx'


Meteor.startup(()=>{
	render(<App />,document.getElementById('render-target'));
});