import './routes.js';
import './templates/templates.html'

Template.main.helpers({
	  loc: function () {
      // return 0, 0 if the location isn't ready
      	return Geolocation.latLng() || { lat: 0, lng: 0 };
    },
    error: Geolocation.error
    

})