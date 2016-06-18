var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var mongo_db_uri = "mongodb://ek5442:NokiaLumia920@ds033875.mlab.com:33875/movies";
var Project = require('./Project');
mongoose.connect(mongo_db_uri);
var db = mongoose.connection;
//connect to a databse
db.on('error',console.error.bind(console, 'connection error:'));

router.get('/', function(req, res, next) {
  res.render('project', { title: 'My Purse' });
});
router.get('/details',function(req,res,next){
	Project.find(function(err,data){
		if(err)
			res.send(err);
		else
			res.send(data);
	})
})
router.post('/',function(req,res,next){
	var name = req.body['name'],
		price = req.body['price'],
		details = req.body['details'],
		date = req.body['date'];

	var project  = new Project({
		'project_name':name,
		'project_price':price,
		'project_details':details,
		'date':date
	});
	console.log(project);
	project.save(function(err,data){
		if(err)
			throw(err);
		else{
			console.dir(data);
		}
	})
})
module.exports = router;