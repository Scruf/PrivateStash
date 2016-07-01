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
	access_token_secret:Twitter.TWITTER_ACCESS_TOKEN_SECRET
})
app.listen(8000);

passport.use(new twitter_passport({
	 consumerKey: Twitter.TWITTER_CONSUMER_KEY,
     consumerSecret: Twitter.TWITTER_CONSUMER_SECRET,
     callbackURL:"https://localhost:8000"

}))