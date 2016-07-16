"use strict"
const express = require('express'),
	app = express(),
	request = require('request'),
	morgan = require('morgan'),
	body_parser = require('body-parser'),
	path = require('path'),
	method_override = require('method-override'),
	cookie_parser = require('cookie-parser'),
	yelp = require('yelp');




app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));
app.use(cookie_parser());
app.use(express.static(path.join(__dirname,'/public')));
app.get('/',(req,res,next)=>{
	res.render('index.ejs');
})

console.log("Listening on port 8000")
app.listen(8000  || process.env.PORT);