from newegg.items import NeweggItem
from scrapy.spiders import CrawlSpider
import scrapy
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
		
		# for selector in response.css('div.additional-sellers > ul.sellers-list > li.sellers-list-item > div > div.item-seller '):
		# 	if len(selector.css('a::attr(href)').extract()) != 0:
		# 		company_review_url ='http://' +str(selector.css('a::attr(href)').extract()[4].replace("//",""))
		# 		yield scrapy.Request(company_review_url,callback=self.review)


		print(response.body)
		for i,selector in enumerate(response.css('div.additional-sellers > ul.sellers-list > li.sellers-list-item > div div.has-form > form.askSellerClassForm')):
			
			items.append(str(selector.css('#itemNumber').extract_first().replace('"','')))
		regex = r"(value=\S{14})"
		
		for item in items:
			match = re.finditer(regex, item)
			for m in match:
				item_number = str(m.group().split("=")[1])
				item_price_url = "http://www.newegg.com/Product/MappingPrice2012.aspx?Item=%s"%(item_number)
				print(item_number)


	def parse_review(self,response):
		print(response.css('div.reviewSummaryTitle>span>span::attr(title)').extract_first())
		# yield scrapy.Request(self.start_urls[0],self.parse)

	def parse_price(self,response):
		first = response.css('li.price-current > strong ::text').extract_first()
		second =  response.css('li.price-current > sup ::text').extract_first()
		# print(second)




		#mappingPrice > div.section > div > div > div.detail > div > ul > li.price-current > strong
#mappingPrice > div.section > div > div > div.detail > div > ul > li.price-current > sup