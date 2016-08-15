/*
	Compare two arrays and return new array with any items found only in one of the two given arrays,but not both.
	In other words, return the symmetric difference of the two arrays
*/
/*
["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"] should return ["pink wool"].
*/
function diffArray(arr1,arr2){
	var newArr = [];
	if(arr1.length===0)
		return arr2;
	if(arr2.length===0)
		return arr1;
	else{
		var temp = [];
		arr1.filter(function(el,index){
			if(arr2.indexOf(el)!==-1){
				arr2.splice(arr2.indexOf(el),1);
				temp.push(arr1[arr1.indexOf(el)]);
			}
		});
		temp.filter(function(el){
			if(arr1.indexOf(el)!==-1){
				arr1.splice(arr1.indexOf(el),1);
			}
		});
		if(arr1.length!==0)
			arr1.filter(function(el){
				newArr.push(el);
			})
		if(arr2.length!==0)
			arr2.filter(function(el){
				newArr.push(el)
			})
		console.log(newArr);
	}
}

diffArray(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"],["diorite", "andesite", "grass", "dirt", "dead shrub"]);