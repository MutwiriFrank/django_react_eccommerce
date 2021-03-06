from django.contrib import admin
import debug_toolbar
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls


urlpatterns = [

    path('admin/', admin.site.urls),
    
    # users
    path('api/users/', include('users.urls', namespace='users' )),

    # store
    path('api/store/', include('store.urls', namespace='store' )),

    # store
    # path('api/mp_payment/', include('mpesa_api.urls', namespace='mpesa_api' )),

    # django rest web login
    path('api_auth/', include('rest_framework.urls', namespace='rest_framework')),

    # documentation
    path('', include_docs_urls(title='SalonAPI')),
    path('schema', get_schema_view(title="SalonAPI", description="API for the SalonAPI",version="1.0.0"), name='openapi-schema'),


]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)



if settings.DEBUG:
    import debug_toolbar
    urlpatterns =[

        # debug toolbar
        path('__debug__/', include(debug_toolbar.urls)),

    ] + urlpatterns
