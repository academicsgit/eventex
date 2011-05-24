# -*- coding: utf-8 -*-

from django import forms
from django.core.validators import EMPTY_VALUES
from django.forms import ValidationError
from django.forms.fields import Field, RegexField, IntegerField
from subscription import mywidgets

class PhoneField(forms.MultiValueField):
    widget = mywidgets.PhoneWidget
    
    def __init__(self, *args, **kwargs):
        fields = (
                forms.IntegerField(),
                forms.IntegerField())
        super(PhoneField, self).__init__(fields, *args, **kwargs)
        
    def compress(self, data_list):
        if not data_list:
            return none
        if data_list[0] in EMPTY_VALUES:
            raise forms.ValidationError(u'DDD inválido.')
        if data_list[1] in EMPTY_VALUES:
            raise forms.ValidationError(u'Número inválido.')
        return '%s-%s' % tuple(data_list)
    
            
        