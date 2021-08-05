from rest_framework import serializers
from .models import Product, Category, Order, OrderItem, ShippingAddress, Dealer
from users.serializers import UserSerializer

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('name', )

class DealerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dealer
        fields = ('shop_name', )

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    dealer = DealerSerializer()

    class Meta:
        model = Product
        fields = ( 'pk', 'id', 'category', 'dealer', 'name','dealer', 'description', 'countInStock','price', 'image', 'rating', 'numReviews')


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
            model = ShippingAddress
            fields = "__all__" 


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"

        
class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user  = serializers.SerializerMethodField(read_only=True)
    class Meta:
            model = Order
            fields = "__all__"
            
    def get_order_items(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data
    def get_shippingAddress(self, obj):
        try:
            address = obj.shippingaddress #can acccess using . and lowercase because its onetoone rlship
        except:
            address = False
            
        serializer = ShippingAddressSerializer(address, many=False)
        
        return serializer.data
            
    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
        




