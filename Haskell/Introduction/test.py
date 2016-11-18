import requests
import json




test = requests.post('https://directory.chatid.com/chatids?channel=newegg.com&name=seagate')
print(test.text)




