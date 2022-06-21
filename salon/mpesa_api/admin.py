from django.contrib import admin
from .models import MpesaCallBacks, MpesaPayment, MpesaCalls

# Register your models here.

admin.site.register(MpesaCalls)
admin.site.register(MpesaPayment)
admin.site.register(MpesaCallBacks)