var axios = require('axios');
var id = "40d0d1708c908cc1241c";
var secret_id = "f91aedc813d9fecca507f50e572198ce9c6f4bad";
var param = "?client_id="+id+"&client_secret="+secret_id;
function getUserName(username){
	return axios.get('https://api.github.com/users/'+username+param);
}
function getRepos(username){
	//fetch github repos info
	return axios.get('https://api.github.com/users/'+username+"/repos"+param+'&per_page=100')
}
function getTotalStars(repos){
	return repos.data.reduce(function(prev,current){
		return prev+current.stargazers_count
	},0)
	//calculate all the stars based on the user repos
}
function getPlayersData(player){
	//will fetch player data
	return getRepos(player.login)
			.then(getTotalStars)
			.then(function(totalStars){
				return {
					followers: player.followers,
					totalStars:totalStars
				}
			})
}
function calculateScors(players){
	return [
		players[0].followers*3+players[0].totalStars,
		players[1].followers*3+players[1].totalStars
	]
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
		var playerOne = getPlayersData(players[0]);
		var playerTwo = getPlayersData(players[1]);
		return axios.all([playerOne,playerTwo])
				.then(calculateScors)
				.catch(function(err){
					console.warn("Error in getPlayersInfo ",err)
				})
	}
}

module.exports = helpers;