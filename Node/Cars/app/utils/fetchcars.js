var axios = require('axios')
function getCars(){
	console.log(axios.get('localhost:8000/cars'))
	return axios.get('localhost:8000/cars')
}
module.exports =  getCars;
