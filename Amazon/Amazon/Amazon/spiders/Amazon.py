from scrapy.spiders import CrawlSpider
from Amazon.items import AmazonItem
from scrapy import Request
import psycopg2
class Amazon(CrawlSpider):

	name = 'Amazon'
	start_urls = []
	# def __init__(self):
	# 		self.seller_id_list = []
	# 		self.seller_id_list = open('Sellers.txt').read().splitlines()
	# 		for seller in self.seller_id_list:
	# 			url = 'https://www.amazon.com/sp?_encoding=UTF8marketplaceID=ATVPDKIKX0DER&orderID=&seller=%s&tab=&vasStoreID='%seller
	# 			self.start_urls.append(url)

	PGSQL_CONN = psycopg2.connect(host= 'babar.elephantsql.com',
									   database= 'ayyzrvfv',
									   user='ayyzrvfv',
									   password='iE1ZCHC3Qn3pWKdfu2lHi0xWbiICajyk')
	PGSQL_CUR = PGSQL_CONN.cursor()

	
		
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
		name = response.css('#storefront-link > a ::text').extract_first()
		if len(ratings)>0:
			ratings = ratings[1]
		else:
			ratings = '0'
		
		yield Request('https://www.amazon.com/s/ref=nb_sb_noss?url=me%%3D%s&field-keywords='%response.meta['seller'],
					 callback=self.parses_number_of_items,
					 meta = {'feed_back_summary':feed_back_summary,
					 		 'cell_phone_number':cell_phone_number,
					 		 'ratings':ratings,
					 		 'name':name,
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
		response.meta.update({"Brand":[]})
		
		yield Request('https://www.amazon.com/Certified-Refurbished/s?ie=UTF8&me=%s&page=1&rh=i%%3Amerchant-items%%2Ck%%3A%%22Certified%%20Refurbished%%22'%response.meta['seller'],
						callback=self.parse_certified_refurbished,
						meta=response.meta
					)

	def parse_certified_refurbished(self,response):
		#		THIS IS WHEN YOU COLLECT THE SELLER INFORMATION WITH A VALUE OF TRUE
		if len((response.css('#s-result-count'))) == 0:
			number_of_refurbished  = len(response.css('#s-results-list-atf > li'))
			response.meta.update({"number_of_refurbished":number_of_refurbished})
			if response.meta['feed_back_summary'] is None:
				response.meta['feed_back_summary'] = '0'
	
			if response.meta['feed_back_summary'] is not None:
				response.meta['feed_back_summary'] = response.meta['feed_back_summary'].split('%')[0]

			if response.meta['ratings']!='0':
				response.meta['ratings'] = str(response.meta['ratings'].split('(')[1].split(' ')[0])

			if response.meta['cell_phone_number'] is None or len(response.meta['cell_phone_number']) == 0:
				response.meta['cell_phone_number'] = ' '

			response.meta['number_of_items'] = response.meta['number_of_items'].replace(',','')
		

			query = """SELECT usp_add_amazonseller('{}','{}','{}','{}','{}','{}','{}');""".format(
				response.meta['name'],response.meta['seller'],response.meta['feed_back_summary'],
				response.meta['ratings'],response.meta['number_of_items'],False,response.meta['cell_phone_number']
			)
			self.PGSQL_CUR.execute(query)
			self.PGSQL_CONN.commit()
			for brand in self.number_of_brands:
				response.meta.update({'brand':brand})	
				url = 'https://www.amazon.com/s/ref=nb_sb_noss?url=me%%3D%s&field-keywords=%s+-refurbished'%(response.meta['seller'],brand)
				yield Request(url,
					callback=self.parse_not_refurbished_brand,
					meta=response.meta)

			
			
		else:
			if response.meta['feed_back_summary'] is None:
				response.meta['feed_back_summary'] = '0'
	
			if response.meta['feed_back_summary'] is not None:
				response.meta['feed_back_summary'] = response.meta['feed_back_summary'].split('%')[0]

			if response.meta['ratings']!='0':
				response.meta['ratings'] = str(response.meta['ratings'].split('(')[1].split(' ')[0])

			response.meta['number_of_items'] = response.meta['number_of_items'].replace(',','')
			
			if response.meta['cell_phone_number'] is None or len(response.meta['cell_phone_number']) == 0:
				response.meta['cell_phone_number'] = ' '

			query = """SELECT usp_add_amazonseller('{}','{}','{}','{}','{}','{}','{}');""".format(
				response.meta['name'],response.meta['seller'],response.meta['feed_back_summary'],
				response.meta['ratings'],response.meta['number_of_items'],True,response.meta['cell_phone_number']
			)
			self.PGSQL_CUR.execute(query)
			self.PGSQL_CONN.commit()
			#	THIS IS WHEN YOU COLLECT TH SELLER INFORMATION WITH A VALUE OF FALSE
			return None
		


	def parse_not_refurbished_brand(self,response):
		try:
			not_refurbished = response.css('#s-result-count ::text').extract_first().split(' ')[0]
			if '-' in not_refurbished:
				not_refurbished = not_refurbished.split("-")[1]
			response.meta.get('Brand').append({'brand_name':response.meta['brand'],'condition':'New','count':not_refurbished})
			
			refurbished_url = 'https://www.amazon.com/s/ref=nb_sb_noss?url=me%%3D%s&field-keywords=%s-refurbished'%(response.meta['seller'],response.meta['brand'])
			brand_list = response.meta.get('Brand')
			brand_list.append({'brand_name':response.meta['brand'],'condition':'New','count':not_refurbished})
			
			# response.meta.get('Brand').append({'brand_name':response.meta['brand'],'condition':'New','count':not_refurbished})
			# response.meta.update({'Brand':response.meta.get('Brand').append({'brand_name':response.meta['brand'],'condition':'New','count':not_refurbished})})
			if len(response.meta['Brand'])!=0:
				query = """SELECT usp_add_amazonsellerbrand('{}','{}','{}','{}');""".format(
						response.meta['seller'],response.meta['brand'],not_refurbished,0
					)
				self.PGSQL_CUR.execute(query)
				self.PGSQL_CONN.commit()
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
			not_brand = response.meta.get('Brand')
			response.meta.get('Brand').append({'brand_name':response.meta['brand'],'condition':'Refurbished','count':refurbished})
			
		
			# not_brand.append({'brand_name':response.meta['brand'],'condition':'Refurbished','count':not_refurbished})
			refurbished_url = 'https://www.amazon.com/s/ref=nb_sb_noss?url=me%%3D%s&field-keywords=%s+-refurbished'%(response.meta['seller'],response.meta['brand'])
			
			if len(response.meta['Brand'])!=0:
				query = """SELECT usp_add_amazonsellerbrand('{}','{}','{}','{}');""".format(
					response.meta['seller'],response.meta['brand'],0,refurbished
				)
				self.PGSQL_CUR.execute(query)
				self.PGSQL_CONN.commit()

			response.meta.pop('brand')

			yield response.meta
		except AttributeError as ai:
		
			refurbished_url = 'https://www.amazon.com/s/ref=nb_sb_noss?url=me%%3D%s&field-keywords=%s-refurbished'%(response.meta['seller'],response.meta['brand'])
			response.meta.pop('brand')

			yield response.meta

# #https://www.amazon.com/Certified-Refurbished/s?ie=UTF8&me=%s&page=1&rh=i%3Amerchant-items%2Ck%3A%22Certified%20Refurbished%22