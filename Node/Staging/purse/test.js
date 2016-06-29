"use strict"
const fs = require('fs')


fs.readdir('./public/',(err,data)=>{
	if(err)
		throw err;
	else
		console.log(data);
})