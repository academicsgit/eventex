# Create your views here.
from django.http import HttpResponse
from django.template import RequestContext
from django.shortcuts import render_to_response

def homepage(request):
  from django.conf import settings
  context = RequestContext(request)
  return render_to_response('index.html', context)

