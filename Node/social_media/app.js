"use strict"
const express = require('express');
const app = express();
const key = require('./api_key');
const fs = require('fs');
const Oauth = require('oauth-1.0a');
const twitter_client = require('./twiter');
const winston = require('winston');
const method_override = require('method-override');
const body_parser = require('body-parser');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const session = require('express-session');
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
app.use(session({
	secret:'Don',
	resave:true,
	saveUninitialized:true
}));

app.use(body_parser.urlencoded({'extended':true}));
app.use(body_parser.json());
app.use(body_parser.json({type:'application/vdn.api+json'}));
app.use(method_override('X-HTTP-Method-Override'));
app.use( passport.initialize());
app.use( passport.session());
passport.use(new TwitterStrategy({
    consumerKey: key.TWITTER_CONSUMER_KEY,
    consumerSecret: key.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
 	console.log("token secret",tokenSecret);
 	console.log("\n");
 	console.log("profile",profile);
 	console.log("\n");

 	  // 		//testins user list
  // 	// twitter_client.get_user_list(profile.id).then((done)=>{
  // 	// 	console.log("displaying list",done);
  // 	// });
  // 	//get user info and save it to cassandra
  // 	twitter_client.get_user_details(profile.id).then((done)=>{
  // 		//new keyspacae will be kreated which will clone whatever is in user profile
		// console.log("Displaying user details",done);
  // 	})
  }
))
/*
	Playing around with twittwer rest api and oauth
*/
var OAuth = require('oauth');
var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  key.TWITTER_CONSUMER_KEY,
  key.TWITTER_CONSUMER_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
);
oauth.getOAuthRequestToken((error,oauthToken,oauthTokenSecret,results)=>{
	if(error)
		throw error;
	else{
		console.log("Obtained ",oauthToken)
		console.log("--------------------------------------------------------------------\n")
		console.log(oauthTokenSecret);
		console.log("--------------------------------------------------------------------\n")
		console.log(results);
		request.get('https://api.twitter.com/oauth/authorize?oauth_token='+oauthToken, (err,response,body)=>{
			if(err)
				throw err;
			else{
				console.log(response)
			}
		})
	}
})

app.get("/",(req,res,next)=>{
  res.send("Hello World");
  res.end("Request to root was made");
})
app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});
//register user
app.post('/register',(req,res,next)=>{
	let email = req.body['email'];
	let password = req.body['password'];
	let social_mdei = req.body['social'];
	let confirm_password = req.body['confirm_password'];
	if(password!=confirm_password){
		req.end("Password does not mathc")
	}
	else{

	}
})


console.log("Listening on port 3000");
app.listen(3000);
