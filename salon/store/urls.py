from django.urls import path
from .views import (ProductList, ProductChange, ProductDetail, 
                    AddOrderItem, GetOrderById, )

app_name = 'store'

urlpatterns = [
    path('', ProductList.as_view(), name="list_products"),
    path('product/<int:pk>/', ProductDetail.as_view(), name="product_detail"),
    path('product_change/<str:pk>/', ProductChange.as_view(), name="rud_products"),
    path('order/add/', AddOrderItem.as_view(), name="add_order"),
    path('order/<int:id>/', GetOrderById.as_view(), name="order_id"),

]