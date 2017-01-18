from scrapy.spiders import CrawlSpider
from Amazon.items import AmazonItem
from scrapy import Request
import time
class Amazon(CrawlSpider):

	name = 'Amazon'
	start_urls = []
	# def __init__(self):
	# 		self.seller_id_list = []
	# 		self.seller_id_list = open('Sellers.txt').read().splitlines()
	# 		for seller in self.seller_id_list:
	# 			url = 'https://www.amazon.com/sp?_encoding=UTF8marketplaceID=ATVPDKIKX0DER&orderID=&seller=%s&tab=&vasStoreID='%seller
	# 			self.start_urls.append(url)


	def start_requests(self):
		for seller in open('Sellers.txt').read().splitlines():
			if len(seller) > 0:
				url = 'https://www.amazon.com/sp?_encoding=UTF8marketplaceID=ATVPDKIKX0DER&orderID=&seller=%s&tab=&vasStoreID='%seller
				yield Request(url,callback=self.parse,meta={'seller':seller})

			

	number_of_brands = ['Brother','Roku','Microsoft','Mohu','Turtle Beach','Winegard','Arris','GoPro','Linksys','Canon','Cisco',
						'LG','Garmin','NETGEAR','Epson','Plantronics','Sony','Beats','Logitech','SanDisk']

#seller-feedback-summary > span > a
	def parse(self,response):
		feed_back_summary = response.css('#seller-feedback-summary > span > a > b ::text').extract_first()
		cell_phone_number = response.css('#seller-contact-phone ::text').extract_first()
		ratings = response.css('#seller-feedback-summary > span > a ::text').extract()
		if len(ratings)>0:
			ratings = ratings[1]
		else:
			ratings = '0'
		
		yield Request('https://www.amazon.com/s/ref=nb_sb_noss?url=me%%3D%s&field-keywords='%response.meta['seller'],
					 callback=self.parses_number_of_items,
					 meta = {'feed_back_summary':feed_back_summary,
					 		 'cell_phone_number':cell_phone_number,
					 		 'ratings':ratings,
					 		 'seller':response.meta['seller']})

	def parses_number_of_items(self,response):
		number_of_items = ''
		try:
			 number_of_items = response.css('#s-result-count ::text').extract_first().split('of')[1].split(' ')[1]
		except IndexError as ie:
			number_of_items = '-1'
			return None
		except AttributeError as ae:
			return None
		response.meta.update({'number_of_items':number_of_items})
	
		yield Request('https://www.amazon.com/Certified-Refurbished/s?ie=UTF8&me=%s&page=1&rh=i%%3Amerchant-items%%2Ck%%3A%%22Certified%%20Refurbished%%22'%response.meta['seller'],
						callback=self.parse_certified_refurbished,
						meta=response.meta
					)

	def parse_certified_refurbished(self,response):
		# print("---------------------------------------------------")
		# print(len(response.css('#s-result-count')))
		# print("---------------------------------------------------")
		if len((response.css('#s-result-count'))) == 0:
			number_of_refurbished = certified_refurbished = response.css('#s-results-list-atf > li')
			response.meta.update({"number_of_refurbished":number_of_refurbished})
			response.meta.update({"Brand":[]})
			for brand in self.number_of_brands:
				response.meta.update({'brand':brand})	
				url = 'https://www.amazon.com/s/ref=nb_sb_noss?url=me%%3D%s&field-keywords=%s+-refurbished'%(response.meta['seller'],brand)
				
				yield Request(url,
					callback=self.parse_not_refurbished_brand,
					meta=response.meta)
		else:
			return None
		yield response.meta


	def parse_not_refurbished_brand(self,response):
		try:
			not_refurbished = response.css('#s-result-count ::text').extract_first().split(' ')[0]
			if '-' in not_refurbished:
				not_refurbished = not_refurbished.split("-")[1]
			print("------------------------------------------------------")
			print(response.meta.get('Brand'))
			print("------------------------------------------------------")
			refurbished_url = 'https://www.amazon.com/s/ref=nb_sb_noss?url=me%%3D%s&field-keywords=%s-refurbished'%(response.meta['seller'],response.meta['brand'])

			response.meta.get('Brand').append({'brand_name':response.meta['brand'],'condition':'New','count':not_refurbished})

			yield Request(refurbished_url,
						  callback=self.parse_refurbished_brand,
						  meta=response.meta)
		except AttributeError as ai:
	
			refurbished_url = 'https://www.amazon.com/s/ref=nb_sb_noss?url=me%%3D%s&field-keywords=%s-refurbished'%(response.meta['seller'],response.meta['brand'])
		
			yield Request(refurbished_url,
						  callback=self.parse_refurbished_brand,
						  meta=response.meta)

	def parse_refurbished_brand(self,response):
		try:
			refurbished = response.css('#s-result-count ::text').extract_first().split(' ')[0]
			if '-' in refurbished:
				refurbished = refurbished.split("-")[1]
			print("------------------------------------------------------")
			print(response.meta.get('Brand'))
			print("------------------------------------------------------")
			refurbished_url = 'https://www.amazon.com/s/ref=nb_sb_noss?url=me%%3D%s&field-keywords=%s+-refurbished'%(response.meta['seller'],response.meta['brand'])
			response.meta.get('Brand').append({'brand_name':response.meta['brand'],'condition':'Refurbished','count':refurbished})
			
			yield Request('https://www.amazon.com/Certified-Refurbished/s?ie=UTF8&me=%s&page=1&rh=i%%3Amerchant-items%%2Ck%%3A%%22Certified%%20Refurbished%%22'%response.meta['seller'],
						callback=self.parse_certified_refurbished,
						meta=response.meta)
		except AttributeError as ai:
		
			refurbished_url = 'https://www.amazon.com/s/ref=nb_sb_noss?url=me%%3D%s&field-keywords=%s-refurbished'%(response.meta['seller'],response.meta['brand'])
		

			yield Request('https://www.amazon.com/Certified-Refurbished/s?ie=UTF8&me=%s&page=1&rh=i%%3Amerchant-items%%2Ck%%3A%%22Certified%%20Refurbished%%22'%response.meta['seller'],
						callback=self.parse_certified_refurbished,
						meta=response.meta)
	

# #https://www.amazon.com/Certified-Refurbished/s?ie=UTF8&me=%s&page=1&rh=i%3Amerchant-items%2Ck%3A%22Certified%20Refurbished%22