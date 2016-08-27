from ConfigParser import ConfigParser
from Crypto.Cipher import AES
from rptoolbox import powertools
import uuid
config  = ConfigParser()
tools = powertools()
config.read('rp_credentials.ini')
#key and salt must be 16,32,48 bytes long
_hash  = str('\xc6@\xc8\xbb\x9fm\xaeG\xbabI\x0b\xe4\x1d\x98\xae')
_salt = str('8\xadt;\xe5\xd5CN\xab\x12\x86y\xd1gn\x96')
print _hash
encrypt_obj  = AES.new(_hash,AES.MODE_CBC,_salt)
decrypt_obj = AES.new(_hash,AES.MODE_CBC,_salt)
dictionary = {}
for section in config.sections():
	dictionary[section] = {}
	for option in config.options(section):
		dictionary[section][option] = config.get(section,option)

encrypted_dictionary = {}
for keys,value in dictionary.items():
	for key,values in value.items():
		if len(values)%16!=0:
			while len(values)%16!=0:
				values = values + '_'
			cipher_text = encrypt_obj.encrypt(values)
			decrypt_text = decrypt_obj.decrypt(values)
			values = cipher_text
			value[key]=values
			print decrypt_text




# for key,value in dictionary.items():
# 	print value





			



