var axios = require('axios');
var id = "40d0d1708c908cc1241c";
var secret_id = "f91aedc813d9fecca507f50e572198ce9c6f4bad";
var param = "?client_id="+id+"&client_secret="+secret_id;
function getUserName(username){
	return axios.get('https://api.github.com/users/'+username+param);
}
function getRepos(username){
	//fetch github repos info
}
function getTotalStars(stars){
	//calculate all the stars based on the user repos
}
function getPlayersData(player){
	
}
var helpers ={
	getPlayersInfo: function(players){
		//fetch data from githuib
		return axios.all(players.map(function(username){
			return getUserName(username)
		})).then(function(info){
			return info.map(function(user){
				return user.data;
			})
		}).catch(function(err){
			console.warn("Error "+err)
		})
	},

	battle: function(players){

	}
}

module.exports = helpers;