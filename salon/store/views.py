from datetime import datetime
from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.postgres.search import SearchVector, SearchQuery

from rest_framework.views import APIView
from rest_framework.generics import  ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from . serializers import ( ProductSerializer, OrderSerializer, CaroselItemsSerializer, CategorySerializer,AdminProductSerializer, 
                            SubCategorySerializer, RoomSerializer)
from . models import (Category, Product, Order, ShippingAddress, QuerySearched, OrderItem, Dealer, Review, CaroselItems, SubCategory, Room)




# Admin create new product
class ProductCreate(APIView):
    permission_classes = [IsAdminUser, ]
    serializer_class = ProductSerializer

    def post(self, request):
        data = request.data
        name = data['name']
        subcategory = data['category']
        description = data['description']
        price = data['price']
        countInStock = data['countInStock']
        try:
            rating = 4
        except:
            pass
        try:
            numReviews = 34
        except:
            pass
        try:
            image = data['image']
        except:
            pass
        category_name = data['category']
        subcategory = SubCategory.objects.get(name=category_name)
        
        dealer_name = data['dealer']
        dealer = Dealer.objects.get(shop_name=dealer_name)
        

        product = Product.objects.create(name=name, price=price, description=description, image=image, 
                countInStock=countInStock, rating=rating, numReviews=numReviews, subcategory=subcategory, dealer=dealer )
        
        serializer = AdminProductSerializer(product, many=False)
        return Response(serializer.data)

#List products searched by a user
class ProductList(ListAPIView):
    permission_classes = [AllowAny,]
    serializer_class = ProductSerializer

    def get(self, request):
        query = request.query_params.get('keyword')    
        #  request.query_params is a more correctly named synonym for request.GET in django rest
        if query == None:
            query = ''
        products = Product.objects.annotate(
            search=SearchVector('name', 'category__name', 'tag__name', 'subcategory__name', 'querysearched__name') ,).filter(search=query)
        if not products:
            QuerySearched.objects.create(name=query)

        page = request.query_params.get('page') # page we are on
        paginator = Paginator(products, 24) # set up paginator

        try:
            products = paginator.page(page)  #if we pass a page from frontend
        except PageNotAnInteger: # if we have not sent any page
            products = paginator.page(1) # the first page is returned
        except EmptyPage:  # when a page passed by user does not exist or have no content
            products = paginator.page(paginator.num_pages)

        if page == None:
            page = 1

        serializer = ProductSerializer(products, many=True)
        return Response({"products": serializer.data, "page": page, "pages":paginator.num_pages })


# View product realtime ehen searching - for ajax calls
class AjaxProductList(ListAPIView):
    permission_classes = [AllowAny,]
    serializer_class = ProductSerializer

    def get(self, request):
        query = request.query_params.get('keyword') 

        if query == None :
            return Response(status=status.HTTP_200_OK) 
        products = Product.objects.annotate(
            search=SearchVector('name', 'category__name', 'tag__name', 'subcategory__name', 'querysearched__name') ,).filter(search=query)
      

        if not products:
          
            return Response(status=status.HTTP_200_OK)
        serializer = ProductSerializer(products, many=True)
        return Response({"products": serializer.data })
    

#Admin - Edit product detaiils
class ProductEdit(APIView):
    permission_classes = [IsAdminUser]
    serializer_class = ProductSerializer

    def put(self, request, pk):
        try:
            product = Product.objects.get(id=pk)
        except:
            return Response("Error, Product not found. Please try again.", status=status.HTTP_400_BAD_REQUEST )
        data=request.data 

        # request.data is same as request.POST or request.FILES in django

        product.name = data['name']
        product.description = data['description']
        product.price = data['price']
        product.countInStock = data['countInStock']
        try:
            product.rating = data['rating']
        except:
            pass
        try:
            product.numReviews = data['numReviews']
        except:
            pass
        try:
            product.image = data['image']
        except:
            pass
        category_name = data['category']['name']
        
        category = Category.objects.get(name=category_name)
        product.category = category

        dealer_shop_name = data['dealer']['shop_name']
        product.dealer = Dealer.objects.get(shop_name=dealer_shop_name)
        product.save()
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK )


# Admin Delete products
class ProductDelete(APIView):
    permission_classes = [IsAdminUser]
    serializer_class = ProductSerializer

    def delete(self, request, pk):
        try:
            product = Product.objects.get(id = pk)
            product.delete()
            return Response("Product deleted successfully", status=status.HTTP_200_OK)
        except:
            return Response("Error occured, try again.", status=status.HTTP_400_BAD_REQUEST)

# Product details view 
class ProductDetail(ListAPIView):
    permission_classes = [AllowAny,]
    lookup_field = 'pk'

    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            
        except:
            return Response({'detail': 'Product not found'}, status=status.HTTP_400_BAD_REQUEST)

        data = ProductSerializer(product).data
        return Response(data, status=status.HTTP_200_OK)

# Admin pload product image
class EditUploadImage(APIView):
    permission_classes = [IsAdminUser, ]
    
    def post(self, request) :
        data= request.data
        product_id = data['product_id']
        try: 
            product = Product.objects.get(id= product_id)
        except:
            return Response ({"detail": "product could not be identified"}, status=status.HTTP_400_BAD_REQUEST)
        
        product.image = request.FILES.get('image')
        product.save()
        return Response('Image was uploaded')


class ProductChange(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUser,]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    
# User place order view -> whwn users place an order it create a new o
class AddOrderItem(APIView):   
    permission_classes = [AllowAny]
    serializer_class = OrderSerializer

    
    def post(self, request):
        
        data = request.data
        orderItems = data['orderItems']
        if orderItems :
            # 1. create order
            order = Order.objects.create(user= request.user, 
                                        shipping_price = data['shippingFee'], 
                                        total_price=data['totalPrice'],
                                        payment_method=data["paymentMethod"]
                                        )
            
            # 2. Create shipping address
            shipping_address = ShippingAddress.objects.create(order=order, city=data['shippingAddress']['city'], 
                                                            road=data['shippingAddress']['road'], 
                                                            estate=data['shippingAddress']['estate'], 
                                                            landmark=data['shippingAddress']['landmark'], 
                                                            phone=data['shippingAddress']['phone'], 
                                                            alternative_phone=data['shippingAddress']['alternative_phone'], 
                                                            shipping_fee=data['shippingFee'],
                                                            
                                                            )
            # 3. Create order Items and set rlship btn order and orderItem and product
            for i in orderItems:          
                product = Product.objects.get(pk = i['product'])             
                order_item = OrderItem.objects.create(product=product, order=order, name=product.name, quantity = i['qty'], price=product.price, image=product.image.url)
                
                # 4. Update stock
                product.countInStock -= order_item.quantity
                product.save()
                
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        else: 
            return Response({'detail': 'No order items'}, status=status.HTTP_400_BAD_REQUEST)

# Get all orders for user. On a user Order page
class GetMyOrders(APIView):
    
    def get(self, request, *args, **kwargs):
        try:
            user = request.user
        except:
            return Response({"detail": "We could not identify you. Try again, or  logout and login again."}, 
            status=status.HTTP_400_BAD_REQUEST )
        orders = user.order_set.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# User can view a specific order
class GetOrderById(APIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = [OrderSerializer, ]
    
    def get(self, request, id, *args, **kwargs):
        try:
            user = request.user
        except:
            return Response({"detail": "We could not identify you. Try again, or  logout and login again."}, 
            status=status.HTTP_400_BAD_REQUEST )
        try:
            order = Order.objects.get(id=id)
        except:
            return Response({"detail":"does not exist"}, status=status.HTTP_400_BAD_REQUEST )
        
        if user.is_staff or order.user:
            serializer = OrderSerializer(order, many=False)
        
            return Response(serializer.data)
        return Response({"detail":"You cant view another users order"}, status=status.HTTP_400_BAD_REQUEST )       
    

# Admin update order to a paid order    
class UpdateOrderToPaid(APIView):
    '''
    update oder to paid and time
    '''
    def put(self, request, id,  *args, **kwargs):
        try:
            order = Order.objects.get(id=id)
            
        except:
            return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        
        order.isPaid =True
        order.paidAt = datetime.now()
            
        order.save()
        # serializer = OrderSerializer(order, many=False)
        # return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'Order is paid'}, status=status.HTTP_200_OK)

# Admin view all orders
class OrderList(ListAPIView):
    permission_classes = [IsAdminUser,]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

class UpdateOrderToDelivered(APIView):
    permission_classes = [IsAdminUser, ]
    serializer_class = OrderSerializer

    def put(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id)
        except:
            return Response({"detail": "Error experienced"}, status = status.HTTP_400_BAD_REQUEST )
        
        order.isDelivered = True
        order.deliveredAt = datetime.now()
        order.save()
        return Response({ 'Order is delivered'}, )


# Create product review only Users who have bought 
class CreateReview(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer

    def post(self, request, product_id):

        user = request.user
        data = request.data
        try:
            product= Product.objects.get(id=product_id)
        except:
            return Response ({'detail': 'Error! Product not found'}, status=status.HTTP_404_NOT_FOUND )

        # Check if user has already reviewed the product
        user_review_exist = product.review_set.filter(user=user).exists()

        if user_review_exist:
            return Response({'detail': 'Error! you have alredy reviewed product'}, status=status.HTTP_400_BAD_REQUEST )

        try:
            rating = data['rating']  or None
        except:
            pass
        try:
            comment = data['comment'] or None
        except:
            pass

        # rating_values = ("1" ,"2" , "3" , "4" , "5" )

        # if rating  is not  rating_values:
        #     return Response({'detail':  'Error! Maximum rating is 5'} , status=status.HTTP_400_BAD_REQUEST )

        if rating == 0 and comment == None:
            return Response( {'detail':  'Error! Please add a rating and a comment'} , status=status.HTTP_400_BAD_REQUEST )


        # 3. Add review 
        user_orders = user.order_set.filter(isPaid=True)
        if user_orders.count() == 0:
            return Response ({'detail':  'Error! You have not purchased anything from our shop'}, status=status.HTTP_400_BAD_REQUEST )
        
        bought_items = []
        for order in user_orders:
            order.orderitem_set.filter(product = product)
            bought_items.append(product)


        if len(bought_items) == 0:
            return Response({'detail':  'Error! You have not purchased this item from our shop'} , status=status.HTTP_400_BAD_REQUEST )

        else :
            review = Review.objects.create(
                user=user,
                product = product,
                name = user.user_name,
                comment = comment,
                rating=rating,
            )

            reviews = product.review_set.all()
            product.numReviews = len(reviews)

            total_ratings = 0
            for i in reviews:
                total_ratings += i.rating

            product.rating = total_ratings / len(reviews)
            product.save()

            return Response({"detail": "Review Added"})


# Get carousel items
class ListCaroselProducts(APIView):
    serializer_class = [CaroselItemsSerializer, ]

    def get(self, request):
        carosel = CaroselItems.objects.filter().order_by('-id')[0:5]
        serializer = CaroselItemsSerializer(carosel, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class Logo(APIView):
    serializer_class = [CaroselItemsSerializer, ]

    def get(self, request):
        carosel = CaroselItems.objects.filter().order_by('-id')[0:5]
        serializer = CaroselItemsSerializer(carosel, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ListTopProducts(APIView):
    
    def get(self, request):
        topProducts = Product.objects.filter().order_by("-rating") [0:8]
        serializer = ProductSerializer(topProducts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ListBedroomTopProducts(APIView):
    
    def get(self, request):
        bedroomProducts = Product.objects.filter().order_by("-rating") [0:8]
        serializer = ProductSerializer(bedroomProducts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ListCategories(APIView):

    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        print(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ListRoomCategories(APIView):

    def get(self, request):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ListSubCategories(APIView):

    def get(self, request):
        subcategories = SubCategory.objects.all()
        serializer = SubCategorySerializer(subcategories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class getSubcategoryProducts(APIView):
    permission_classes = [AllowAny]

    def get(self, request, subcategory_id):
        
        try:
            subcategory = SubCategory.objects.get(id=subcategory_id)
        except:
            return Response ({"detail": "Error, category does not exist"},  status=status.HTTP_400_BAD_REQUEST)

        products = subcategory.product_set.all()
        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK )


class CategoryProducts(APIView):
    permission_classes = [AllowAny]

    def get(self, request, category_id):
        
        try:
            category = Category.objects.get(id=category_id)
        except:
            return Response ({"detail": "Error, category does not exist"},  status=status.HTTP_400_BAD_REQUEST)

        print("category", category)

        products = Product.objects.filter(category=category)

        print('categoryproduct', products)
        
        serializer = ProductSerializer(products, many=True)
        print(serializer.data)

        return Response(serializer.data, status=status.HTTP_200_OK )


class getProductsByRooms(APIView):
    permission_classes = [AllowAny]

    def get(self, request, subcategory_id):
        
        try:
            room = Room.objects.get(id=subcategory_id)
        except:
            return Response ({"detail": "Error, category does not exist"},  status=status.HTTP_400_BAD_REQUEST)

        products = room.product_set.all()
        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK )


class ListBedroomTopProducts(APIView):
    
    def get(self, request):
        room = Room.objects.get(room="Bedroom")
        products = room.product_set.filter().order_by("-rating") [0:8]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ListLivingRoomTopProducts(APIView):
    
    def get(self, request):
        room = Room.objects.get(room="Living")
        products = room.product_set.filter().order_by("-rating") [0:8]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



        
