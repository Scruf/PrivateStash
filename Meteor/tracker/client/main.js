import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Data} from '../api/timestamp.js';
import { HTTP } from 'meteor/http'
import './main.html';
 
Template.body.events({
	'click .save'(event){
		event.preventDefault()
		function success(pos){
			console.log(new Date());
			HTTP.call('POST','https://api.mlab.com/api/1/databases/movies/collections/DeliveryLoc?apiKey=mS1eukopD5Ulis8iu5qjc7ykx0YpsUYb',{
				data:{
					"time": new Date,
					"lat":pos.coords.latitude,
					"long":pos.coords.longitude

				}
			},(err,response)=>{
				if(err)
					console.log(err.reason);
				else
					console.log(response);
			})
			console.log(pos);
		}
		function error(err){
			console.log(err);
		}
		navigator.geolocation.getCurrentPosition(success,error);
	}
})

