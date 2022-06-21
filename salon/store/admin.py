from django.contrib import admin
from .models import Product, Category, Review,  Dealer, Order, OrderItem, ShippingAddress, CaroselItems, SubCategory, Room

# Register your models here.
admin.site.register(CaroselItems)

admin.site.register(Dealer)  

admin.site.register(Category)

admin.site.register(SubCategory)  

admin.site.register(Room)  

admin.site.register(Product)   

admin.site.register(Review) 

admin.site.register(Order)

admin.site.register(OrderItem)

admin.site.register(ShippingAddress)

