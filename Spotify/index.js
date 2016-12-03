"use strict"
const requests = require('requests')
const SpotifyCredentials = require('./SpotifyCredentials')
const express = require('express')
const app = express()
const body_parser = require('body-parser')
const morgan = require('morgan')
const method_override = require('method-override')
const SpotifyRouter = express.Router()

app.use(morgan('dev'))
app.use(body_parser.urlencoded({'extended':false}))
app.use(body_parser.json())
app.use(body_parser.json({type:'application/vdn.api+json'}))
app.use(method_override('X-HTTP-Method-Override'))

SpotifyRouter.route('/')
.get((req,res,next)=>{
	let register_link  =`https://accounts.spotify.com/authorize?\
						client_id=${SpotifyCredentials.SpotifyClientId}\
						&response_type=code&redirect_url=localhost:8000/hello`
	console.log(register_link)
	requests(register_link,(err,response,body)=>{
		if (err){
			console.log('got an error');
			throw err;
		}
		else
			console.log(body)
	})
})

app.use('/',SpotifyRouter)

SpotifyRouter.route('/hello')
.get((req,res,next)=>{
	res.send('Hello World')
})
app.use('/hello',SpotifyRouter)
app.listen(8000)
