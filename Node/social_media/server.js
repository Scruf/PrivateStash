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
	 'https://test-scruff93.c9.io'
	 "HMAC-SHA1"
);
console.log(oa);
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