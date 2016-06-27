var fs = require('fs'),
	_ = require('lodash'),
	mongoose = require('mongoose');
var mongo_db_uri = "mongodb://ek5442:NokiaLumia920@ds033875.mlab.com:33875/movies";
var Project = require('./Project');
mongoose.connect(mongo_db_uri);
var db = mongoose.connection;
//connect to a databse
db.on('error',console.error.bind(console, 'connection error:'));
fs.readFile('projects.json',"utf8",function(err,data){
	if(err)
		throw err;
	else{
		JSON.parse(data).filter(function(el){
			var project = new Project(el);
			project.save(function(err,data){
				if(err)
					throw err;
				else
					console.log(data);
			})
		});
	}
});