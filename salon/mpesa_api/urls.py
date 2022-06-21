
from django.urls import path, include
from .views import getAccessToken, lipa_na_mpesa_online, register_urls, confirmation, validation, call_back

app_name = "mpesa_api"

urlpatterns = [


    # store
    path('access/token/', getAccessToken, name='mpesa_api' ),
    path('online/lipa/', lipa_na_mpesa_online, name='lipa_na_mpesa'),

        # register, confirmation, validation and callback urls
    path('c2b/register/', register_urls, name="register_mpesa_validation"),
    path('c2b/confirmation/', confirmation, name="confirmation"),
    path('c2b/validation/', validation, name="validation"),
    path('c2b/callback/', call_back, name="call_back"),

]