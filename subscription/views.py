# -*- coding: utf-8 -*-
# Create your views here.
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response, get_object_or_404
from django.core.mail import send_mail
from django.core.urlresolvers import resolve, reverse
from forms import SubscriptionForm
from models import Subscription

def subscribe(request):
    if request.method == 'POST':
        return create(request)
    else:
        return new(request)

def new(request):
    form = SubscriptionForm()
    context = RequestContext(request, {'form': form})
    return render_to_response('subscription/new.html', context)

def create(request):
    form = SubscriptionForm(request.POST)
    if not form.is_valid():
        context = RequestContext(request, {'form': form})
        return render_to_response('subscription/new.html', context)
    subscription = form.save()
    try:
      send_mail(
              subject = u'Inscrição no Eventex.',
              message = u'Obigado por se inscrever no Eventex!',
              from_email = 'contato@eventex.com.br',
              recipient_list = ['henrique@bastos.net'],)
    except:
        pass  
      
    return HttpResponseRedirect(
                            reverse('subscription:success', args=[subscription.pk]))
    
def success(request, pk):
    subscription = get_object_or_404(Subscription, pk=pk)
    context = RequestContext(request, {'subscription': subscription})
    return render_to_response('subscription/success.html', context)

    

    
