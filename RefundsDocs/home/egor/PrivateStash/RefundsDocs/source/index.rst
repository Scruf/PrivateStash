.. Refunds Pro Docs documentation master file, created by
   sphinx-quickstart on Thu Nov  3 19:36:21 2016.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to Refunds Pro Docs's documentation!
============================================

Contents: Documentation for Refunds.Pro

.. toctree::
   :maxdepth: 2




.. rp_toolbox:

Refunds Pro Rp Tollbox
--------------------------

This section contains Refunds Pro Rp Tool box ddocumentation

:ref:`rp_toolbox`.


Methods
============================================
.. py:function:: def listFinancialEvents(amazon_order_id)

		Returns financial events for a given order, financial event group, or date range.
		First we iterate over the response and construct initial base for a dictionary which
		will be pushed to DB

.. code-block:: python
	
	#iterate over finance block and get necessary data
	if str(elem.tag)=='{http://mws.amazonservices.com/Finances/2015-05-01}ListFinancialEventsResult':
		for stuff in elem[0][6].iter():
			#accuire OrderItemID
			if str(stuff.tag)=='{http://mws.amazonservices.com/Finances/2015-05-01}OrderItemId':
				#update a dictionary with this data
				amazon_order_id_obj.update({'order_id':stuff.text})
			#accuire QuantityShipped
			elif str(stuff.tag)=='{http://mws.amazonservices.com/Finances/2015-05-01}QuantityShipped':
				#update a dicitionary with this data
				amazon_order_id_obj.update({'quantityshipped':stuff.text})
			#accuire SelkerSKU
			elif str(stuff.tag)=='{http://mws.amazonservices.com/Finances/2015-05-01}SellerSKU':
				#update a dictionary with this data
				amazon_order_id_obj.update({'sellersku':stuff.text})
			#accuire AmazonOrder Id
			elif str(stuff.tag)=='{http://mws.amazonservices.com/Finances/2015-05-01}AmazonOrderId':
				#update a dictionary with this information
				amazon_order_id_obj.update({'amazonorderid':stuff.text})
			#accuire Marketpalcename from a response
			elif str(stuff.tag)=='{http://mws.amazonservices.com/Finances/2015-05-01}MarketplaceName':
				#update amazon object with this information
				amazon_order_id_obj.update({'marketplacename':stuff.text})
			#accuire SellerOrderId
			elif str(stuff.tag)=='{http://mws.amazonservices.com/Finances/2015-05-01}SellerOrderId':
				#update dictionary with this information
				amazon_order_id_obj.update({'seller_order_id':stuff.text})
			else:
				pass

After constructing amazon object we will construct Charge and Fee type objects. We will only record
Charge if the charge ammount is greater than 0 for a Fee we wll only collect fee if its value is 
less than zero

.. code-block:: python

	#iterate over ListFinancialEventsResult and construct appropriate dictionaries
	for el in elem[0][6][0][0][0].iter():
				#if the element tag is ItemCharge List than we construt dicitionary
				if str(el.tag)=='{http://mws.amazonservices.com/Finances/2015-05-01}ItemChargeList':
					for ChargeComponent in el:
						#if the value of charge is grater than zero
						if float(ChargeComponent[1][0].text)>0.0:
							#construct charge dictionary
							charge_obj = {
								'ChargeType':ChargeComponent[0].text,
								'ChargeAmmount':float(ChargeComponent[1][0].text),
								'CurrencyCode':ChargeComponent[1][1].text
							}
							#update charge dicitionary with the dicitionary we created above
							charge_obj.update(amazon_order_id_obj)
							#append this dicitonary to the list
							charge_list.append(charge_obj)
					#end of the Charge acquisition
				if str(el.tag)=='{http://mws.amazonservices.com/Finances/2015-05-01}ItemFeeList':
				#iterate over Fee and construct appropriate dictionaries
					for ItemList in el:
						#if the fee is less than zero 
						if float(ItemList[1][0].text)<0.0:
							#construct appropriate dictionary
							financial_obj = {
								'FeeType':ItemList[0].text,
								'FeeAmount':float(ItemList[1][0].text),
								'FeeCurrencyCode':ItemList[1][1].text
							}
							#update this dicitonary with the dictionary constructed above
							financial_obj.update(amazon_order_id_obj)
							#append this dicitionary to the list
							financial_list.append(financial_obj)
	
After collection all necessary information we will create queries whih will push nformation to DB
First we push information to finance type table

.. code-block:: python

	#iterate over finance
	for finance in financial_list:
		#create query string
		query = """SELECT public.usp_financial_fee_amount('{}','{}','{}','{}','{}','{}','{}','{}','{}')""".format(
		finance['FeeType'],finance['FeeAmount'],finance['FeeCurrencyCode'],finance['amazonorderid'],
		finance['order_id'],finance['quantityshipped'],finance['sellersku'],finance['marketplacename'],
		finance['seller_order_id'])
		#execute this query string
		Constants.PGSQL_CUR.execute(query)
		print("-----------------------------------------------------------------------------")
		#display the Finance Id
		print("Finance Item Id '{}'\n".format(Constants.PGSQL_CUR.fetchone()[0]))
		print("-----------------------------------------------------------------------------")
		#Save it to DB
		Constants.PGSQL_CONN.commit()

Now we will push information to the Charge table

.. code-block:: python

	#iterate over charge list
	for charge in charge_list:
	#construct appropriate query string
		query = """SELECT public.usp_financial_charge_type('{}','{}','{}','{}','{}','{}','{}','{}','{}')""".format(
		charge['ChargeType'],charge['ChargeAmmount'],charge['CurrencyCode'],charge['amazonorderid'],
		charge['order_id'],charge['quantityshipped'],charge['sellersku'],charge['marketplacename'],
		charge['seller_order_id'])
		#execute this query on the database
		Constants.PGSQL_CUR.execute(query)
		print("-----------------------------------------------------------------------------")
		print("Charge Item Id '{}'\n".format(Constants.PGSQL_CUR.fetchone()[0]))
		print("-----------------------------------------------------------------------------")
		#save it to the database
		Constants.PGSQL_CONN.commit()



 