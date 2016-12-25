from craiglist.items import CraiglistItem
from scrapy.spiders import CrawlSpider


class Craiglist(CrawlSpider):
	name = 'Craiglist'
	start_urls = ['https://newyork.craigslist.org/search/hum']


	def parse(self,response):
		items = []
		select = response.css('.rows > li')
		for s in select:
			craiglist = CraiglistItem()
			craiglist['name'] = s.css('li.result-row > p.result-info>a::text').extract_first()
			craiglist['url'] = s.css('li.result-row > p.result-info > a::attr(href)').extract_first()
			craiglist['location'] = s.css('li.result-row > p.result-info > span.result-meta > span.result-hood ::text').extract_first()
			yield craiglist



			
