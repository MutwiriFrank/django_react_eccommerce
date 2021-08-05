from django.urls import path
from .views import (ProductList, ProductChange, ProductDetail, ProductEdit, ProductDelete, ProductCreate,
                    AddOrderItem, GetOrderById, UpdateOrderToPaid, GetMyOrders, EditUploadImage)

app_name = 'store'

urlpatterns = [
    path('', ProductList.as_view(), name="list_products"),
    path('product/edit/<int:pk>/', ProductEdit.as_view(), name="product_edit"),
    path('product/create/', ProductCreate.as_view(), name="product_create"),
    path('product/edit_image/', EditUploadImage.as_view(), name="upload_image"),
    path('product/delete/<str:pk>/', ProductDelete.as_view(), name="product_delete"),
    path('product_change/<str:pk>/', ProductChange.as_view(), name="rud_products"),
    path('product/<int:pk>/', ProductDetail.as_view(), name="product_detail"),


    path('order/add/', AddOrderItem.as_view(), name="add_order"),
    path('order/my-orders/', GetMyOrders.as_view(), name="my_orders"),
    path('order/<int:id>/', GetOrderById.as_view(), name="get_order"),
    path('order/<int:id>/pay/', UpdateOrderToPaid.as_view(), name="order_pay"),
]