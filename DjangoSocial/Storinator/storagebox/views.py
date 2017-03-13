from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.contrib.auth.decorators import login_required
import json
import requests as req
# Create your views here.
@login_required
def index(request):
    print(dir(request))
    return render(request, 'storagebox/index.html')



def dropbox(request):
    if request.method == 'POST':
        print("Dropbox just submitted something wow")
        print(request)
        return HttpResponse("POST from dropbox")
    else:
        print("Maybe it was DROPBOX")
        return HttpResponse("Dropbox response")

def test(request):
    return HttpResponse("Response from Test")
