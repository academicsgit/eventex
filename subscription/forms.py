# -*- coding: utf-8 -*-
from django import forms
from subscription.models import Subscription
from django.utils.translation import ugettext as _ 
from django.utils.translation import ungettext
from subscription import validators
from subscription import myfields


class SubscriptionForm(forms.ModelForm):
    phone = myfields.PhoneField(label=_(u'Telefone'))
        
    class Meta:
        model = Subscription
        exclude = ('created_at','paid')
        
    def clean(self):
        """Metodo usado para verificar se pelo menos o e-mail ou telefone foram informados
        É chamado após todos os clean_xxx e por isto deve-se verificar se as chaves dos campos estao
        no cleaned_data"""
        super(SubscriptionForm, self).clean()
        if not self.cleaned_data.get('email') and not self.cleaned_data.get('phone'):
            raise forms.ValidationError(_(u'Informe seu e-mail ou telefone.'))
        return self.cleaned_data
    

#class SubscriptionForm(forms.Form):
#"""Form gerado manualmente sem auxilio de um modelform"""
#    name = forms.CharField(label=_('Nome'), max_length=100)
#    cpf = forms.CharField(label=_('CPF'), validators=[validators.CpfValidator])
#    email = forms.CharField(label=_('E-mail'))
#    phone = forms.CharField(label=_('Telefone'), required=False, max_length=20)
#    
#    def _unique_check(self, fieldname, error_message):
#        param = { fieldname: self.cleaned_data[fieldname] }
#        try:
#            s = Subscription.objects.get(**param)
#        except Subscription.DoesNotExist:
#            return self.cleaned_data[fieldname]
#        raise forms.ValidationError(error_message)
#    
#    def clean_cpf(self):
#        """ validação para um campo em especifico"""
#        return self._unique_check('cpf', _(u'CPF já inscrito'))
#    
#    def clean_email(self):
#        """ validação para um campo em especifico"""
#        return self._unique_check('email',_(u'E-mail já inscrito'))
#    
#    def clean(self):
#        """ Validação final, após a dos campos, deve-se verificar se o objeto esta no cleaned_data"""
#        if not self.cleaned_data.get('email') and not self.cleaned_data.get('phone'):
#            raise forms.ValidationError(_(u'Você precisa informar seu e-mail ou seu telefone.'))
#        return self.cleaned_data
#    
#    