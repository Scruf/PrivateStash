from django.shortcuts import render, loader, redirect
from django.http import HttpResponse
from django.contrib import messages
from .models import User
# Create your views here.
def index(request):
	main_page = loader.get_template('report/login.html')
	return HttpResponse(main_page.render(None,request))

def login(request):
	login_template = loader.get_template('report/login.html')
	return HttpResponse(login_template.render(None,request))

def register(request):
	register_template = loader.get_template('report/register.html')
	return HttpResponse(register_template.render(None,request))

def validate(request):
	if request.method == 'POST':
		try:
			user = User.objects.get(email=request.POST.get('email'),password=request.POST.get('password'))
			if user.is_approved:
				return redirect('/report/%s'%user.user_id)
			else:
				return HttpResponse("User was not approved yet")
		except User.DoesNotExist:
			return HttpResponse('Failure')

def save(request):
	if request.method == 'POST':
		try:
			user = User(email=request.POST.get('email'), password=request.POST.get('password'), is_approved=False)
			user.save()
		except User.MultipleObjectsReturned:
			return HttpResponse("Multiple instaces of these account exists")
		return redirect('/report/%s'%user.user_id)

def report(request,email):
	return HttpResponse("Helllo %s"%email)