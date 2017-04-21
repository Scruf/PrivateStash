import requests,json
from pprint import pprint
from datetime import datetime,timedelta

API_KEY = 'ed8d5642354cf5923dd88b237a65'


partners_request =  requests.get('https://candidate.hubteam.com/candidateTest/v2/partners?userKey=%s'%API_KEY)
country = set()
partners_list = []
country_list = []
dates = set()

for response in partners_request.json()['partners']:
	country.add(response['country'])
	partners_list.append(response)
	for date in response['availableDates']:
		dates.add(date)


start_date = datetime.strptime('2017-04-13', "%Y-%m-%d")
end_date =  datetime.strptime('2017-07-07',"%Y-%m-%d")

partners_by_country = []
country_list = list(country)
for i in range (0,len(country_list)):
	partner_obj = {'name':country_list[i],'attendees':[],'attendeeCount':0,'startDate':"null"}
	date_max = 0
	for partner in partners_list:
		if partner['country'] == country_list[i]:
			count = 0
			if str(start_date).split(' ')[0] in partner['availableDates']:
				partner_obj['startDate'] = str(start_date).split(' ')[0]
				count = count + 1
			if str(start_date+timedelta(1)).split(' ')[0] in partner['availableDates']  and start_date+timedelta(1) != end_date:
				count = count + 1
				partner_obj['startDate'] = str(start_date+timedelta(1)).split(' ')[0]
			if count > 0: 
				partner_obj['attendees'].append(partner['email'])
				partner_obj['attendeeCount'] = partner_obj['attendeeCount'] + 1
			count =  0 
			
	partners_by_country.append(partner_obj)
result =  {'countries':partners_by_country}
pprint(result)
hub_post =  requests.post('https://candidate.hubteam.com/candidateTest/v2/results?userKey=%s'%API_KEY,data=json.dumps(result))
# print(hub_post.text)