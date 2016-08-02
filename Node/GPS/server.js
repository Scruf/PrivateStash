var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var geolocation = require('geolocation');
var morgan = require('morgan');
var method_override = require('method-override');
var body_paresr = require('body-parser');


app.use(morgan('dev'));
app.use(body_paresr.urlencoded({'extended':false}));
app.use(body_paresr.json());
app.use(body_paresr.json({type:'application/vdn.api+json'}));
app.use(method_override('X-HTTP-Method-Override'));
