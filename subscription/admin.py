# -*- coding: utf-8 -*-
from django.contrib import admin
from subscription.models import Subscription
import datetime

from django.utils.translation import ugettext as _ 
from django.utils.translation import ungettext
from django.conf.urls.defaults import patterns, url
from django.http import HttpResponse

class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('name','email','phone','paid','created_at','subscribed_today')
    date_hierarchy = 'created_at'
    search_fields = ('name','email','phone','created_at')
    list_filter = ['created_at']
    actions = ['mark_as_paid']
    
    def subscribed_today(self, obj):
        return obj.created_at.date() == datetime.date.today()
    subscribed_today.short_description = 'Inscrito hoje?'
    subscribed_today.boolean = True
    
    def mark_as_paid(self, request, queryset):
        """Action adicional, deve ser registrada na lista actions[]"""
        count = queryset.update(paid=True)
        msg = ungettext(
                u'%(count)d inscrição foi marcada como paga.',
                u'%(count)d inscrições foram marcadas como pagas.',
                count) % {'count': count}
        self.message_user(request, msg)
    mark_as_paid.short_description = _(u"Marcar como pagas")
    
    def export_subscriptions(self, request):
        """Metodo usado para exportar inscricoes, deve ser registrado no get_urls"""
        subscriptions = self.model.objects.all()
        rows = [','.join([s.name, s.email]) for s in subscriptions]
        response = HttpResponse('\r\n'.join(rows))
        response.mimetype = "text/csv"
        response['content-Disposition'] = 'atachement; filename=inscricoes.csv'
        return response
    
    
    def get_urls(self):
        """Usado para criar uma nova view dentro do admin do objeto."""
        original_urls = super(SubscriptionAdmin, self).get_urls()
        extra_url = patterns('',
                        url(r'exportar-inscricoes/$',
                            self.admin_site.admin_view(self.export_subscriptions),
                            name='export_subscriptions')
           )
        return extra_url + original_urls
    
    

admin.site.register(Subscription, SubscriptionAdmin)
