from django.conf.urls.defaults import patterns, include, url


urlpatterns = patterns('subscription.views',
                       url(r'^$', 'subscribe', name='subscribe'),
                       url(r'^(\d+)/sucesso/$', 'success', name='success'),
                       
                       )