"use strict"
const HTMLWebPackPlugin = require('html-webpack-plugin'),
	HTMLWebPackPluginConfig = new HTMLWebPackPlugin({
		template: __dirname+'/app/index.html',
		filename: 'index.html',
		inject:'body'
	});
module.exports = {
	entry:[
		'./app/index.js'
	],
	output:{
		path:__dirname+'/dist',
		filename: 'bundle.js'
	},
	module:{
		loaders:[
			{test:/\.js$/,exclude:/node_modules/,loader:'babel-loader'}
		]
	},
	plugins:[HTMLWebPackPluginConfig]
}