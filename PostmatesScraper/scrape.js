var fs = require('fs'),
	cheerio = require('cheerio'),
	request = require('request'),
	mongoose = require('mongoose'),
	Restaraunt = require('./Restaraunts'),
	mongodbURI = "mongodb://ek5442:NokiaLumia920@ds033875.mongolab.com:33875/movies";


mongoose.connect(mongodbURI);
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));




var DEFAULT_URL ="https://postmates.com/new-york-city";
var not_to = "/new-york-city/spotlight/postmates-plus";
request(DEFAULT_URL,function(err,response,html){
	if(err)
		throw err;
	else{
		var $ = cheerio.load(html);
		$('.featured .grid').each(function(){
			var data = $(this);
			data.children().children().each(function(){
				var a_tags = $(this);
				if (a_tags.attr('href')!==not_to){
					var title_url = "https://postmates.com"+a_tags.attr('href');
					request(title_url,function(err,response,html){
						if(err)
							throw err;
						else{
							var $ = cheerio.load(html);
							var name = $('.inner h1').text();
							var address = $('.inner h2').text();
							var hours = $('.inner .hours');
							var data = new Restaraunt({
								'name':name.replace(/\r?\n?\?|\r/g, ''),
								'address':address.replace(/\r?\n|\r/g, ''),
							});
							data.save(function(err,data){
								if (err)
									throw err;
								else
									console.dir(data);
							});
						
						}
					});
				}

			});
		});
	}
});


