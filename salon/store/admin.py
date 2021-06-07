from django.contrib import admin
from .models import Product, Category, Review,  Dealer, Order, OrderItem, ShippingAddress

# Register your models here.

admin.site.register(Dealer)  

admin.site.register(Category)

admin.site.register(Product)   

admin.site.register(Review) 

admin.site.register(Order)

admin.site.register(OrderItem)

admin.site.register(ShippingAddress)

   
   