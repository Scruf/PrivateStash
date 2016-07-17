"use strict"
const Twitter = require('./api_key')
const twitter = require("twitter")
const passport = require('passport')
const express = require('express')
const app = express();
const twitter_passport = require('passport-twitter').Strategy;
let client = new twitter({
	consumer_key:Twitter.TWITTER_CONSUMER_KEY,
	consumer_secret:Twitter.TWITTER_CONSUMER_SECRET,
	access_token_key:Twitter.TWITTER_ACCESS_TOKEN,
	access_token_secret:Twitter.TWITTER_ACCESS_TOKEN_SECRET,
	callbackURL:'http://127.0.0.1:8000:/login/twitter/return'
})


client.get('friends/list.json&user_id=774553603',(err,response,data)=>{
	console.log("response=>",response);
	console.log("\n");
	console.log("data=>",data);
	console.log("\n");
})
