"use strict"
const request = require('request'),
	cheerio = require('cheerio'),
	mongoose = require('mongoose'),
	_ = require('lodash');



let DEFAULT_URL = "http://www.imdb.com/title/tt0182576/episodes?season=";
let episode_array = [];
for(let i=1;i<=1;i++)
	episode_array.push(i);
episode_array.filter((el)=>{
	request(DEFAULT_URL+el, (err,response,html)=>{
		if(err)
			console.log(err);
		else{
			let $ = cheerio.load(html);
			let season_name = $('#episode_top').text();
			$('div.list.detail.eplist').children().each((index,el)=>{
				el.children.filter((element)=>{
					console.log(element.text());
				})
			})
		}

	})
})