from datetime import datetime
from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.generics import  ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from . serializers import ProductSerializer, OrderSerializer
from . models import Product, Order, ShippingAddress, OrderItem


# Create your views here.


class ProductList(ListAPIView):
    permission_classes = [AllowAny,]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    
class ProductDetail(ListAPIView):
    permission_classes = [AllowAny,]
    lookup_field = 'pk'

    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            data = ProductSerializer(product).data
        except:
            Response('Product not found', status=status.HTTP_400_BAD_REQUEST)
        
        return Response(data, status=status.HTTP_200_OK)


class ProductChange(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUser,]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    
    
class AddOrderItem(APIView):
    print('am here')
    serializer_class = OrderSerializer

    
    def post(self, request):
        data = request.data
        orderItems = data['orderItems']
        print(data)
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
        print("user", user)
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