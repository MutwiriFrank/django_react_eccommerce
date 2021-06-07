from django.urls import path, include
from django.views.generic import TemplateView

from . import views

app_name = 'blog'
urlpatterns =[

   path('', TemplateView.as_view(template_name="blog/index.html")),
   # path('create/', views.post_create_view),

]