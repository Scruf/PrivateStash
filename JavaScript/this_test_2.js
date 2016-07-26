/*
	Explicit Binding 
	call, apply,bind
*/

var sayName = function(arr){
	console.log("My name "+this.name+" arr "+arr);
}
var stacey = {
	name:'Stacey',
	age:34
};
var arr = ['JS','C++']
sayName.call(stacey,arr);
sayName.apply(stacey,arr);
var newf = sayName.bind(stacey,arr);
console.log("__________");
newf();
