from django.shortcuts import render, loader, redirect
from django.http import HttpResponse
from django.contrib import messages
from .models import User
from .dataset import DataSet
# Create your views here.
# @method inded wll render main page
def index(request):
	#@param main_page will grab html template from templates/report 
	main_page = loader.get_template('report/login.html')
	#render an HTML page on the request and a
	#HttpResponse takes Node because we are passinsg nothing to context
	return HttpResponse(main_page.render(None,request))
#@method register will render register template 
def register(request):
	#@method register_template  wull grab html from templates/report and render the html
	register_template = loader.get_template('report/register.html')
	#HttpResponse take Nonde because nothing will be passed to a context
	return HttpResponse(register_template.render(None,request))
#@method validate will validata the user credentials and grant him access is the user has right permission
def validate(request):
	# if the request method is POST
	if request.method == 'POST':
		#than first we check whether the user exists
		try:
			#try to find the use in the databse by his emal or passwrod 
			user = User.objects.get(email=request.POST.get('email'),password=request.POST.get('password'))
			#check whether the user was approved by administrator or not
			if user.is_approved:
				#if the user appove. User will be redirected to the his/her page
				return redirect('/report/%s'%user.user_id)
				#otherwise we let the user know that he does not have previlege to see the page yet
			else:
				#HttpResponse will return an error message
				return HttpResponse("User was not approved yet")
				#if the user does not exists
		except User.DoesNotExist:
			#than we will retunr an appropriate error message
			return HttpResponse('Failure')
#@method save will validate and save the user to databse
def save(request):
	#if the request method is POST than we validata and save the user
	if request.method == 'POST':
		try:
			#construct the User object with a default value of False for approval status
			user = User(email=request.POST.get('email'), password=request.POST.get('password'), is_approved=False)
			# save the user to DB
			user.save()
			#if the user already have and account than we will notify user 
		except User.MultipleObjectsReturned:
			#HttpResponse will send and error message saying that account already exists
			return HttpResponse("Multiple instaces of these account exists")
			#otherwise we redirect to the users page
		return redirect('/report/%s'%user.user_id)#@method will 
#@report will render a test report
def report(request,email):
	#@param data  is an Instance of DataSet obhect which has a test dataset
	data  = DataSet()
	#@parama some_set_data is an empty string which will containt the data from the set
	context = {
		'list': data.get_data()
	}
	#accessing template html from the templates/report/report 
	order_template = loader.get_template("report/report.html")
	#rendering the data on the web page
	return HttpResponse(order_template.render(context,request))