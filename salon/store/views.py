from datetime import datetime
from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.generics import  ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from . serializers import ProductSerializer, OrderSerializer
from . models import Category, Product, Order, ShippingAddress, OrderItem, Dealer


# Create your views here.

class ProductCreate(APIView):
    permission_classes = [IsAdminUser, ]
    serializer_class = ProductSerializer

    def post(self, request):
        data = request.data
        name = data['name']
        category = data['category']
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
        print("category_name", category_name)
        category = Category.objects.get(name=category_name)
        
        dealer_name = data['dealer']
        dealer = Dealer.objects.get(shop_name=dealer_name)
        

        product = Product.objects.create(name=name, price=price, description=description, image=image, 
                countInStock=countInStock, rating=rating, numReviews=numReviews, category=category, dealer=dealer )
        
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)



        serializer = ProductSerializer()
    

class ProductList(ListAPIView):
    permission_classes = [AllowAny,]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class ProductEdit(APIView):
    permission_classes = [IsAdminUser]
    serializer_class = ProductSerializer

    def put(self, request, pk):
        try:
            product = Product.objects.get(id=pk)
        except:
            return Response("Error, Product not found. Please try again.")
        data=request.data
        print(data)

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
        print("category", category)
        product.category = category

        dealer_shop_name = data['dealer']['shop_name']
        product.dealer = Dealer.objects.get(shop_name=dealer_shop_name)
        product.save()
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK )

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
    
class ProductDetail(ListAPIView):
    permission_classes = [AllowAny,]
    lookup_field = 'pk'

    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            
        except:
            Response('Product not found', status=status.HTTP_400_BAD_REQUEST)

        data = ProductSerializer(product).data
        return Response(data, status=status.HTTP_200_OK)
        


class ProductChange(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUser,]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    
    
class AddOrderItem(APIView):
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
        return Response({'detail': 'Order is paid'}, status=status.HTTP_200_OK)


class EditUploadImage(APIView):
    permission_classes = [IsAdminUser, ]
    
    def post(self, request) :
        data= request.data
        product_id = data['product_id']
        try: 
            product = Product.objects.get(id= product_id)
        except:
            return Response ("product could not be identified", status=status.HTTP_400_BAD_REQUEST)
        
        product.image = request.FILES.get('image')
        product.save()
        return Response('Image was uploaded')

        
class OrderList(ListAPIView):
    permission_classes = [IsAdminUser,]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    print(queryset)

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
        return Response({'detail': 'Order is delivered'}, status=status.HTTP_200_OK)


