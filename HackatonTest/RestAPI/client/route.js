Router.configure({
	layoutTemplate: 'index'
})
Router.route('/',function(){
	this.render('main')
})
Router.route('/hello',function(){
	let req = this.request;
	let res = this.response;
	res.end('HEllo');
}),{where:'server'}

Router.map(function () {
  this.route('serverEndpoint', {
    path: '/server/path',
    where: 'server'
  }, function () {
    // "this" is the RouteController instance.
    // "this.response" is the Connect response object
    // "this.request" is the Connect request object

    this.response.writeHeader('Content-Type', 'text/html');
    this.response.write('hello world');
  });
});