"use strict"
const requests = require('request')
const SpotifyCredentials = require('./SpotifyCredentials')
const express = require('express')
const app = express()
const body_parser = require('body-parser')
const morgan = require('morgan')
const method_override = require('method-override')
const cookie_parser = require('cookie-parser')
const querystring = require('querystring')
const Helpers = require('./helpers')
const SpotifyRouter = express.Router()
const state_key = Helpers.random_string()


app.use(morgan('dev'))
app.use(body_parser.urlencoded({'extended':false}))
app.use(body_parser.json())
app.use(body_parser.json({type:'application/vdn.api+json'}))
app.use(method_override('X-HTTP-Method-Override'))
app.use(cookie_parser())

SpotifyRouter.route('/')
.get((req,res,next)=>{
	const state =  Helpers.random_string()
	
	res.cookie(state,state_key)
	res.redirect('https://accounts.spotify.com/authorize?'+
		querystring.stringify({
			response_type:'code',
			client_id:SpotifyCredentials.SpotifyClientId,
			redirect_uri:'localhost:8000/hello',
			state:state
		})
	)
})

app.use('/',SpotifyRouter)

SpotifyRouter.route('/hello')
.get((req,res,next)=>{
	
})
app.use('/hello',SpotifyRouter)


app.listen(8000)
