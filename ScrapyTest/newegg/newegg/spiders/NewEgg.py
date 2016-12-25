from newegg.items import NeweggItem
from scrapy.spiders import CrawlSpider
#//*[@id="search-results"]/div[2]/table
class NewEgg(CrawlSpider):
	name = 'NewEgg'
	start_urls = ['http://www.newegg.com/Product/Product.aspx?Item=9SIA22A53Z3817']



	def parse(self,response):
		# selectors = response.css(".additional-sellers > ul > li")
		# for selector in selectors:
		# 	print(selector.css('.sellers-list-item::text').extract())
		print(response.css('div.additional-sellers > ul.sellers-list > li.sellers-list-item > div > div.item-seller > a::attr(href)').extract())
