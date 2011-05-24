# -*- coding: utf-8 -*-

from django import forms
from django.core.validators import EMPTY_VALUES

class PhoneWidget(forms.MultiWidget):
    def __init__(self, attrs=None):
        widgets = (
                   forms.TextInput(attrs=attrs),
                   forms.TextInput(attrs=attrs))
        super(PhoneWidget, self).__init__(widgets, attrs)
    
    def decompress(self, value):
        if not value:
            return [None, None]
        return value.split('-')