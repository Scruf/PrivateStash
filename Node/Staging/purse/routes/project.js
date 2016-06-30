"use strict"
var express = require('express');
var router = express.Router();
const Project = require('../models/Project');
const mongoose = require('mongoose');
const mongo_db_uri = "mongodb://ek5442:NokiaLumia920@ds033875.mlab.com:33875/movies";
mongoose.connect(mongo_db_uri);
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'))
/* GET users listing. */
router.get('/', (req, res, next)=> {
  Project.find({},(err,data)=>{
  	if(err)
  		throw err;
  	else{
  		res.send(data);
  		res.end("Data was send")
  	}

  })
});

module.exports = router;
