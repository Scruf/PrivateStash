from pprint import pprint
import json

garbage_list = []
with open('log.json','r') as data:
	garbage_list = json.load(data)



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

for item in name_set:
	for dup in garbage_list2:
		print(element(dup,item))

