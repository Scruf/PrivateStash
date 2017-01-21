from pprint import pprint
import json
import time
# import psycopg2
garbage_list = []
with open('log.json','r') as data:
	garbage_list = json.load(data)


def clean(garbage):
	if garbage['feed_back_summary'] is None:
		garbage['feed_back_summary'] = '0'
	
	if garbage['feed_back_summary'] is not None:
		garbage['feed_back_summary'] = garbage['feed_back_summary'].split('%')[0]

	if garbage['ratings']!='0':
		garbage['ratings'] = str(garbage['ratings'].split('(')[1].split(' ')[0])


	garbage['number_of_items'] = garbage['number_of_items'].replace(',','')
	return garbage


# for item in garbage_list:
# 	if len(item['Brand'])==0:
# 		pprint(item)
garbage_list2 = []
for i in range(0,len(garbage_list)-1):
	if len (garbage_list[i]['Brand']) != 0:
		garbage_list2.append(garbage_list[i])


name_set = set()
for item in garbage_list2:
	name_set.add(item['name'])
temp =[]

# for item in name_set:
# 	for dup in garbage_list2:
# 		if dup.get('name') == 'AZI storefront':
# 			print(len(dup['Brand']))

newlist = sorted(garbage_list2, key=lambda k: k['name'])
exclusive_list = []
for name in name_set:
	count = 0
	for i in range(0,len(newlist)-1):
		if name == newlist[i]['name']:
			count= i
		
	exclusive_list.append(newlist[count])

for i in range(0,len(exclusive_list)):
	exclusive_list[i] = clean(exclusive_list[i])
pprint(exclusive_list)


	
