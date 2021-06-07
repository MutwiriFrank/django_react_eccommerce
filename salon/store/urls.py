from django.urls import path
from .views import ProductList, ProductChange, ProductDetail

app_name = 'store'

urlpatterns = [
    path('', ProductList.as_view(), name="list_products"),
    path('product/<int:pk>/', ProductDetail.as_view(), name="product_detail"),
    path('product_change/<str:pk>/', ProductChange.as_view(), name="rud_products"),

]