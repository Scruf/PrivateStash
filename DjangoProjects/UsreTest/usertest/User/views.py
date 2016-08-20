from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth import authenticate
from .models import User
# Create your views here.

def index(request):
	main_template = loader.get_template('user/index.html')
	context =  {
		'hello':'world'
	}
	return HttpResponse(main_template.render(context,request))

def validate(request):
	if request.method == 'POST':
		try:			
			email  = request.POST.get('email')
			password = request.POST.get('password')
			user = User.objects.get(email=email, password=password)
			return HttpResponse("User does exists")
		except User.DoesNotExist:
			return HttpResponse("User does not exists")
