from django.urls import path
from .views import (ListSubCategories, ListCategories, ProductList, ProductChange, ProductDetail, ProductEdit, ProductDelete, ProductCreate,
                    AddOrderItem, GetOrderById, UpdateOrderToPaid, GetMyOrders, EditUploadImage, OrderList, CategoryProducts,
                    UpdateOrderToDelivered, CreateReview, ListCaroselProducts, ListTopProducts , getSubcategoryProducts,
                    ListRoomCategories, AjaxProductList
                    )

app_name = 'store'

urlpatterns = [
    path('', ProductList.as_view(), name="list_products"),
    path('category/<int:category_id>/', CategoryProducts.as_view(), name="list_products_incategory"),
    path('subcategory/<int:subcategory_id>/', getSubcategoryProducts.as_view(), name="list_products_insubcategory"),
    path('product/edit/<int:pk>/', ProductEdit.as_view(), name="product_edit"),
    path('product/create/', ProductCreate.as_view(), name="product_create"),
    path('product/edit_image/', EditUploadImage.as_view(), name="upload_image"),
    path('product/delete/<str:pk>/', ProductDelete.as_view(), name="product_delete"),
    path('product_change/<str:pk>/', ProductChange.as_view(), name="rud_products"),
    path('product/<int:pk>/', ProductDetail.as_view(), name="product_detail"),
    path('product/<int:product_id>/review/', CreateReview.as_view(), name="product_review"),
    path('ajax_search/', AjaxProductList.as_view(), name="ajax_search"),

    path('categories/', ListCategories.as_view(), name="carosel_products"),
    path('sub_categories/', ListSubCategories.as_view(), name="sub_categories"), 
    path('rooms/', ListRoomCategories.as_view(), name="rooms"), 


    path('carosel/', ListCaroselProducts.as_view(), name="carosel_products"),
    path('top_products/', ListTopProducts.as_view(), name="top_products"),

    path('order/add/', AddOrderItem.as_view(), name="add_order"),
    path('order/my-orders/', GetMyOrders.as_view(), name="my_orders"),
    path('order/<int:id>/', GetOrderById.as_view(), name="get_order"),
    path('order/<int:id>/pay/', UpdateOrderToPaid.as_view(), name="order_pay"), 
    path('orders/', OrderList.as_view(), name="list_orders"),
    path('order/<int:order_id>/deliver/', UpdateOrderToDelivered.as_view(), name="order_deliver"),
    
]   