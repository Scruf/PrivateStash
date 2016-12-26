from newegg.items import NeweggItem
from scrapy.spiders import CrawlSpider
import re
#//*[@id="search-results"]/div[2]/table
class NewEgg(CrawlSpider):
	name = 'NewEgg'
	start_urls = ['http://www.newegg.com/Product/Product.aspx?Item=9SIA22A53Z3817']



	def parse(self,response):
		items = []
		# selectors = response.css(".additional-sellers > ul > li")
		# for selector in selectors:
		# 	print(selector.css('.sellers-list-item::text').extract())
		# print(response.css('div.additional-sellers > ul.sellers-list > li.sellers-list-item > div > div.item-seller > a::attr(href)').extract())
		# print(response.css('div.additional-s>ellers > ul.sellers-list > li.sellers-list-item > div > div.item-seller > a::text').extract())
		for i,selector in enumerate(response.css('div.additional-sellers > ul.sellers-list > li.sellers-list-item > div ')):
			if i%2 == 0 or i == 0:
				items.append(str(selector.css('div.has-form > form.askSellerClassForm>#itemNumber').extract_first().replace('"','')))
		regex = r"(value=\S{14})"
	
		for item in items:
			match = re.finditer(regex, item)
			for m in match:
				print(m.group().split("=")[1])

	
