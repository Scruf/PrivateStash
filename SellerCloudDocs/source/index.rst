.. HLX documentation master file, created by
   sphinx-quickstart on Thu Nov 24 16:42:28 2016.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to HLX's documentation!
===============================

Contents:

.. toctree::
   :maxdepth: 2

Sellercloud wrapper documentation created by Egor Kozitski

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`


This section contains codes samples and method explanations

Methods
==================
Authentication with SellerCloud API

.. code-block:: python

	#First create a dicitionary which will be used for authentication
	Credentials = {"WSDL":"<link_to_wisdl>","UserName":"<your_username>","Password":"<you_password>"}
	#authenticate with this credentials 
	sc = Sellercloud.Sellercloud(Credentials)

.. py:function:: def GetClientID():
		
		Will retrieve the clients id on the Sellercloud

.. code-block:: python
	
	#will retrieve client id
	sc.GetClientID()
	#on success id will be printed 
	#otherwise exception with terrible message will be printed






