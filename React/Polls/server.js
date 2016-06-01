var fs = require('fs'),
	path = require('path'),
	express = require('express'),
	body_parser = require('body-parser'),
	app = express ();

app.set('port',(process.env.PORT || 3000));
app.use('/',express.static(path.join(__dirname,'public')));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Cache-Control','no-cahce');
	next();
});
app.get('/',function(req,res){
	res.send("Hello Cunt");
})
app.listen(app.get('port'),function(){
	console.log("listening on port ",app.get('port'));
})