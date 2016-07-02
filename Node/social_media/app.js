"use strict"
const express = require('express');
const app = express();
const morgan = require('morgan');
const method_override = require('method-override');
const body_parser = require('body-parser');
const request = require("request");
app.use(morgan('dev'))
app.use(body_parser.urlencoded({'extended':true}));
app.use(body_parser.json());
app.use(body_parser.json({type:'application/vdn.api+json'}));
app.use(method_override('X-HTTP-Method-Override'));
app.get("/",(req,res,next)=>{
  res.send("Hello World");
  res.end("Request to root was made");
})
console.log("Listening on port 8000");
app.listen(8000);
