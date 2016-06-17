var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    project_schema = new Schema({
        project_name:String,
        project_price:String,
        project_details:String,
        date: Date
        
    });
var Project = mongoose.model('Purse',project_schema);
module.exports = Project;