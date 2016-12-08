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
			redirect_uri:'https://localhost:8000/hello',
			state:state
		})
	)


})

app.use('/',SpotifyRouter)

SpotifyRouter.route('/callback')
.get((req,res,next)=>{
	let code = req.query.code || null
	let state = req.query.state || null
	let stored_state = req.cookies ? 
					   req.cookies[state_key] :
					   null
	console.log(state)
	if (state == null || state !=stored_state){
		res.redirect('/#'+
			querystring.stringify({
				error:'state_mismatch'
			})
		)
	}else{
		res.clearCookie(state_key)
		console.log("Wtf")
		let authOptions = {
			uri:'https://accounts.spotify.com/api/token',
			form:{
				code:code,
				redirect_uri:'https://localhost:8000/hello',
				grant_type:'authorization_code'
			},
			headers:{
				'Authorization':'Basic'+(new Buffer(SpotifyCredentials.SpotifyClientId+":"+SpotifyCredentials.SpotifyClientSecret).toString('base64'))
			},
			json: true
		};
		request.post(authOptions, (error,reponse,body)=>{
			if (err)
				throw err;
			else{
				const access_token = body.access_token,
					  refresh_token = body.refresh_token;
				const options = {
					uri:'https://api.spotify.com/v1/me',
					headers:{'Authorization':'Bearer'+access_token},
					json:true
				}
				request.get(options,(error,reponse,body)=>{
					console.log(body)
				})
			}
		})
	}
})
SpotifyRouter.route('/hello')
.get((req,res,next)=>{
	res.send('Authorized')
})
app.use('/hello',SpotifyRouter)
app.use('/callback',SpotifyRouter)


app.listen(8000)
