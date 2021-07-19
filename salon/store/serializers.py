from rest_framework import serializers
from .models import Product, Category, Order, OrderItem, ShippingAddress
from users.serializers import UserSerializer

class CategorySerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Category
        fields = ('name', )

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = ( 'pk', 'category', 'name', 'description', 'countInStock','price', 'image', 'rating', 'numReviews')
  
  
class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
            model = ShippingAddress
            fields = "__all__" 
 
 
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"

        
class OrderSerializer(serializers.ModelSerializer):
    orders = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user  = serializers.SerializerMethodField(read_only=True)
    class Meta:
            model = Order
            fields = "__all__"
            
    def get_orders(self, obj):
        items = obj.orderItem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data
    
    def get_shippingAddress(self, obj):
        try:
            address = obj.shipping_address
        except:
            address = 'pick up'
        serializer = ShippingAddressSerializer(address, many=False)
        return serializer.data
            
    def get_users(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
        




