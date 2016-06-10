
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    restaraunt_schema = new Schema({
        name:String,
        address:String,
    });
var Restaraunt = mongoose.model('Restaraunt',restaraunt_schema);
module.exports = Restaraunt;