var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var project_schema = new Schema({
	project_name:{
		type:String
	},
	project_price:{
		type:Number
	},
	project_description:{
		type:String
	},
	project_items: [
	{
		item_name:String,
		item_price:Number
	}
  ]
});

var Project = mongoose.model('Project', project_schema);
module.exports = Project;