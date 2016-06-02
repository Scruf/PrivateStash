Router.configure({
	layoutTemplate: 'index'
})
Router.route('/',function(){
	this.render('main')
});