//Implicit binding
/*
	Where is this function invoked

*/
var syaName = function(name){
	console.log("Hello "+name);
}
syaName('Egor');

/*
	Implicit binding
	Left of the Dot at Call time
*/
var me = {
	name:"Egor",
	age:23,
	sayName: function(){
		console.log(this.name);
	}
}
var sayMixin = function(obj){
	obj.sayName = function(){
		console.log(this.name);
	}
}
var me = {
	name:"Egor",
	age:23
};
var you = {
	name:"NB",
	age:22
}
sayMixin(me);
sayMixin(you);
me.sayName();
you.sayName();
var Person = function(name,age){
	return {
		name:name,
		age:age,
		sayName: function(){
			console.log(this.name);
		}
	}
};
var Bob = Person('Bob',23);
Bob.sayName();