/*
	new binding
	windows binding
*/
var Animal = function(color,name,type){
	this.color = color;
	this.name = name;
	this.type = type;
}
var lol = new Animal('Block',"Samanta","Zerg");
var age = function(){
	console.log(this.age);
};
var me = {
	age:25
};
window.age = 25;
age();