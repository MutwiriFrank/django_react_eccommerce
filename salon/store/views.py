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
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, ]
    
    def post(self, request):
        data = request.data
        orderItems = data['orderItems']
        
        if orderItems and len(orderItems) > 0:
            # 1. create order
            order = Order.objects.create(user= request.user, payment_method = data['paymentMethod'], shipping_method = data['shippingMethod'], 
                                         total_price=data['totalPrice']
                                         )
            
            # 2. Create shipping address
            shipping_address = ShippingAddress.objects.create(order=order, city=data['shippingAddress']['city'], 
                                                              estate=data['shippingAddress']['estate'], 
                                                              landmark=data['shippingAddress']['landmark'], 
                                                              phone=data['shippingAddress']['phone'], 
                                                              alternative_phone=data['shippingAddress']['alternative_phone'], 
                                                              shipping_fee=data['shippingFee']
                                                              )
            
            # 3. Create order Items and set rlship btn order and orderItem and product
            for i in orderItems:
                try:
                    product = product.objects.get(pk=i['product'])
                except:
                    return Response("wrong id when hetting asscociating orderproduct and actual product ")
                
                order_item = OrderItem.objects.create(product=product, order=order, name=product.name, quantity=í['qty'], 
                                                      price=product.price, image=product.image.url)
                
            
            
                # 4. Update stock
                product.countInStock -= order_item.qty
                product.save()
                
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
                  
        else:
            
            return Response({'detail': 'No order items'}, status=status.HTTP_400_BAD_REQUEST)