"use strict"
const express = require('express');
const app = express();
const winston = require('winston');
const method_override = require('method-override');
const body_parser = require('body-parser');
const request = require("request");
let logger = new winston.Logger({
	transports:[
		new winston.transports.File({
			level:'info',
			filename:'logs.log',
			handleException:true,
			json:true,
			maxsize:542880,
			maxFiles:5,
			colorize:true
		}),
		new winston.transports.Console({
			level:'debug',
			handleException:true,
			colorize:true
		})
	],
	exitOnError:false
});
logger.stream = {
	write: (message,encoding)=>{
		logger.info(message);
	}
};
app.use(require('morgan')("combined",{"stream":logger.stream}));
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
