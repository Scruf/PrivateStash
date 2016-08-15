"""
	Compare two arrays and return new array with any items found only in one of the two given arrays,but not both.
	In other words, return the symmetric difference of the two arrays
"""
def diffArray(arr1,arr2):
	temp = []
	for x in arr1:
		if x not in arr2:
			temp.append(x)
	for x2 in arr2:
		if x2 not in arr1:
			temp.append(x2)
	print temp











diffArray([1,2,3,4,5],[1,2,3,4,7])