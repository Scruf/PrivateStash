from django.test import TestCase
import unittest
# Create your tests here.
from django.test import Client

class SimpleTest(unittest.TestCase):
	def setUp(self):
		self.client = Client()

	def test_index(self):
		response = self.client.get('/reprt/')
		self.assertEqual(response.status_code,200)