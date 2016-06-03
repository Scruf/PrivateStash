import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {


Router.map(function () {
  this.route('api', {
    path: '/api',
    where: 'server',
    action: function () {
      var json = '{ "employees" : [' +
'{ "firstName":"John" , "lastName":"Doe" },' +
'{ "firstName":"Anna" , "lastName":"Smith" },' +
'{ "firstName":"Peter" , "lastName":"Jones" } ]}'; // what ever data you want to return
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
  }
});
});
  // code to run on server at startup
});
