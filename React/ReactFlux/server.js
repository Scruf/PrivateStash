"use strict"
const express = require('express'),
	app = express(),
	morgan = require('morgan'),
	body_parser = require('body-parser'),
	method_override = require('method-override');

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(body_parser.urlencoded({'extended':true}));
app.use(body_parser.json());
app.use(body_parser.json({type:'application/vdn.api+json'}))
app.use(method_override('X-HTTP-Method-Override'));


app.get('/',(req,res,next)=>{
	res.render('index.ejs')
})


console.log("Listening on port 8000");
app.listen(8000 || process.env.PORT)





