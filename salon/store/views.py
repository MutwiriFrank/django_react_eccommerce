from django.shortcuts import render
from . serializers import ProductSerializer
from . models import Product
from rest_framework.generics import  ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

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
    





