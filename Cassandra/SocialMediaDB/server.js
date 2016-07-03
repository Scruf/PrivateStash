"use strict"
const express = require('express'),
	  app = express(),
	  request = require('request'),
	  method_override = require('method-override'),
	  body_parser = require('body-parser'),
	  winston = require('winston'),
	  cassandra_client = require('cassandra-driver');


let logger = new winston.Logger({
	transports:[
		new winston.transports.File({
			level:'info',
			filename:'cassandra_logs.log',
			handleException:true,
			json:true,
			maxsize:54280,
			maxFiles:10,
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
app.use(method_override('X-HTTP-Method=Override'));
console.log("Listening on port 8000");
app.get('/',(req,res,next)=>{
	res.send('Hello World');
})
app.listen(8000 || process.env.PORT);


