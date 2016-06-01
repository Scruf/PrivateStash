var fs = require('fs'),
	path = require('path'),
	express = require('express'),
	body_parser = require('body-parser'),
	app = express ();
var COMMENT_FILE = path.join(__dirname,'comments.json');
console.log(COMMENT_FILE);
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
	res.sendFile('public/index.html')
})
app.get('/api/comments',function(req,res){
	fs.readFile(COMMENT_FILE,function(err,data){
		if(err){
			console.log(err);
			console.log("Errpr");
			process.exit(1);
		}else{
			res.json(JSON.parse(data));
		}
	})
})
app.post('/api/comments/',function(req,res){
	fs.readFile(COMMENT_FILE,function(err,data){
		if(err)
		{
			console.log(err);
			process.exit(1);
		}
		var comments = JSON.parse(data);
		var new_comments = {
			id: Date.now(),
			author: req.body.author,
			text: req.body.text,
		};
		comments.push(new_comments);
		fs.writeFile(COMMENT_FILE,JSON.stringify(comments,null,4),function(err){
			if(err){
				console.log(err);
				process.exit(1);
			}
			res.json(comments);
		});
	});
});
app.listen(app.get('port'),function(){
	console.log("listening on port ",app.get('port'));
})