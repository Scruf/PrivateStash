"use strict"
const requests = require('request')
const SpotifyCredentials = require('./SpotifyCredentials')
const express = require('express')
const app = express()
const body_parser = require('body-parser')
const morgan = require('morgan')
const method_override = require('method-override')
const cookie_parser = require('cookie-parser)
const SpotifyRouter = express.Router()

app.use(morgan('dev'))
app.use(body_parser.urlencoded({'extended':false}))
app.use(body_parser.json())
app.use(body_parser.json({type:'application/vdn.api+json'}))
app.use(method_override('X-HTTP-Method-Override'))
app.use(cookie_parser())


SpotifyRouter.route('/')
.get((req,res,next)=>{
	let register_link  =`https://accounts.spotify.com/authorize?`+
						`client_id=${SpotifyCredentials.SpotifyClientId}`+
						`&response_type=code&redirect_url=localhost:8000/hello`
	console.log(register_link)
	requests(register_link,(err,response,body)=>{
		if (err){
		throw err;
		}
		else
			console.log(body)
	});
})

app.use('/',SpotifyRouter)

SpotifyRouter.route('/hello')
.get((req,res,next)=>{
	console.log(req)
})
app.use('/hello',SpotifyRouter)


app.listen(8000)
