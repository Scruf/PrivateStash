"use strict"
const express = require('express'),
	fs = require('fs'),
	app = express(),
	morgan  = require('morgan'),
	body_parser = require('body-parser'),
	method_override =  require('method-override');


app.use(morgan('dev'));
app.use(body_parser.urlencoded({'extended':false}));
app.use(body_parser.json());
app.use(body_parser.json({type:'application/vdn.api+json'}));
app.use(method_override('X-HTTP-Method-Override'));



console.log("Listening on port 8000");
app.get('/cars', (req,res,next)=>{
	fs.readFile('car.json','utf-8', (err,data)=>{
		if(err)
			res.send(err);
		else{
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.send(JSON.parse(data));
			res.end("Respond was sended")
		}
	})
})
app.listen(8000)

