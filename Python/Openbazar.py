import requests
from pprint import pprint


class Openbazar:


	def __init__(self):
		self.url = '<your_ip_address>:18469/api/v1/'


	def get_profile(self):
		profile_request = requests.get(self.url+'profile')
		print(profile_request)


if __name__ == '__main__':
	openabazar = Openbazar()
	openabazar.get_profile()
