# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class NeweggItem(scrapy.Item):
    condition = scrapy.Field()
    delivery = scrapy.Field()
    seller = scrapy.Field()
    price_shipping =  scrapy.Field()