# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class AmazonItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    seller_feedback_count = scrapy.Field()
    seller_feedback_percentage = scrapy.Field()
    seller_cell_number = scrapy.Field()
    # brand_name = scrapy.Field()
    # new = scrapy.Field()
    # refurbished = scrapy.Field()
