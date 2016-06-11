import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.map.helpers({
    mapOptions: function() {
   		var map;
   		
    	function getLocation(){
    		if(navigator.geolocation)
    			navigator.geolocation.getCurrentPosition(getLatLng);
    			
      	}
    	function getLatLng(position){
    			let lat = position.coords.latitude;
  				let lng = position.coords.longitude;
  				if(GoogleMaps.loaded()){
  					console.log(lat,lng);
  					return {
        				center: new google.maps.LatLng(lat, lng),
        				zoom: 8
      				};
  				}
  				
  			}
    		return getLocation();
        }
      
  
});

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

