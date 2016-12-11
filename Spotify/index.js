"use strict"
const request = require('request')
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
	const scope ='user-read-private user-read-email'
	
	res.redirect('https://accounts.spotify.com/authorize?'+
		querystring.stringify({
			response_type:'code',
			client_id:SpotifyCredentials.SpotifyClientId,
			scope:scope,
			redirect_uri:'http://localhost:8000/callback',
			state:state
		})
	)


})

app.use('/',SpotifyRouter)

SpotifyRouter.route('/callback')
.get((req,res,next)=>{
	
	let code = req.query.code || null
	let state = req.query.state || null
	
	if (state == null){
		res.redirect('/#'+
			querystring.stringify({
				error:'state_mismatch'
			})
		)
	}else{
			
		let authOptions = {
			uri:'https://accounts.spotify.com/api/token',
			form:{
				code:code,
				redirect_uri:'http://localhost:8000/callback',
				grant_type:'authorization_code'
			},
			headers:{
				'Authorization':'Basic '+(new Buffer(SpotifyCredentials.SpotifyClientId+":"+SpotifyCredentials.SpotifyClientSecret).toString('base64'))
			},
			json: true
		};
		
		request.post(authOptions, (error,reponse,body)=>{
			if (error)
				throw error;
			else{
				const access_token = body.access_token,
					  refresh_token = body.refresh_token;
				
				const options = {
					uri:'https://api.spotify.com/v1/me',
					headers:{'Authorization':'Bearer '+access_token},
					json:true
				}
				request.get(options,(error,reponse,body)=>{
					const id = body.id
					
					let current_playlist = {
						uri:`https://api.spotify.com/v1/users/${id}/playlists`,
						form:{
							code:code,
							redirect_uri:'http://localhost:8000/callback',
							grant_type:'authorization_code'
						},
						headers:{
							'Authorization':'Bearer '+access_token
						},
						json: true
					}
					request.get(current_playlist,(error,reponse,body)=>{
						if(error)
							throw error;
						else{
						
							const playlist_id = body.items[0].id
							const uri = `https://api.spotify.com/v1/users/${id}/playlists/${playlist_id}`
							let playlist = {
								uri:uri,
								form:{
									code:code,
									redirect_uri:'http://localhost:8000/callback',
									grant_type:'authorization_code'
								},
								headers:{
									'Authorization':'Bearer '+access_token
								},
								json: true
							}
							console.log(playlist)
							
						}
					})
					
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
