from rest_framework import serializers
from .models import Product, Category, Order, OrderItem, ShippingAddress, Dealer, Review, CaroselItems, SubCategory, Room
from users.serializers import UserSerializer


class CaroselItemsSerializer(serializers.ModelSerializer):

    class Meta:
        model = CaroselItems
        fields = "__all__"


class DealerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Dealer
        fields = ('shop_name', )

class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = "__all__"

        

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields =  ("category", "id","name", "image", "description")


class AdminProductSerializer(serializers.ModelSerializer):
    subcategory = SubCategorySerializer()
    dealer = DealerSerializer()
    review = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = ( 'pk', 'id', 'subcategory', 'dealer', 'name','dealer', 'description', 'countInStock','price', 'image', 'rating', 'review',  'numReviews')

    def get_review(self, obj):
        review = obj.review_set.all()
        serializer = ReviewSerializer(review, many=True)
        return serializer.data


class ProductSerializer(serializers.ModelSerializer):

    review = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = ( 'pk', 'id', 'name', 'description', 'countInStock','price', 'image', 'rating', 'review',  'numReviews', 'discount' )

    def get_review(self, obj):
        review = obj.review_set.all()
        serializer = ReviewSerializer(review, many=True)
        return serializer.data


class CategorySerializer(serializers.ModelSerializer):
    subcategory = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Category
        fields = ('name', 'description', 'image', 'id', 'subcategory'  )
    
    def get_subcategory(self, obj):
        items = obj.subcategory_set.all()
        serializer = SubCategorySerializer(items, many=True)
        return serializer.data


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
            model = Room
            fields = "__all__" 


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
        



    # class Meta:
    #     model= SearchQuery
    #     fields = ('query', )

    
    # def create(self, validated_data):
    #     instance = self.Meta.model(**validated_data)  # SearchQuery

    #     if instance is not None:
    #         instance.save()
    #         return instance





