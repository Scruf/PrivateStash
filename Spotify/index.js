"use strict"
const requests = require('requests')
const SpotifyCredentials = require('./SpotifyCredentials')
const express = require('express')
const app = express()

app.listen(8000)
app.get('/hello', (req,res,next)=>{
	res.send("Hello")
})


