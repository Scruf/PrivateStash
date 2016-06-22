var request = require('request'),
	express = require('express'),
	Oauth = require('oauth-1.0a'),
	key = require('./api_key'),
	app = express();
var OAuth= require('oauth').OAuth;
var oa = new OAuth(
	"https://api.twitter.com/oauth/request_token",
	"https://api.twitter.com/oauth/access_token",
	 key.TWITER_CONSUMER_KEY,
	 key.TWITTER_CONSUMER_SECRET,
	"1.0",
	"https://api.twitter.com/oauth/authorize",
	"HMAC-SHA1"
);

oa.get('https://api.twitter.com/1.1/statuses/update.json?status=Maybe%20he%27ll%20finally%20find%20his%20keys.%20%23peterfalk','774553603-BXCIo5xpRl1CAA52g3yssAAzRlWbx9t7Oqi3aRPz','S7aScfhqSZndN9sMIVPuJ6CQypBk1nww1Ws4gMW1g9r0S',function(err,data,resp){
	if(err)
		console.log(err);
	else
		console.log(data);
})
app.post('/twiter', function(req,res,next){

});
//facebook router
app.post('/facebook',function(req,res,next){

});
//linkedin router
app.post('/linkedin',function(req,res,next){

});
//tumbler router
app.post('/tumblr',function(req,res,next){

});
//pininterest router
app.post('/pininterest',function(req,res,next){

});
//instagram router
app.post('/instagram',function(req,res,next){

});
//google + router
app.post('/google',function(req,res,next){

})
