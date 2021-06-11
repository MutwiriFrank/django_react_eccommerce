from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated,  IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.views import ( TokenObtainPairView, TokenRefreshView,)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password   

from .models import NewUser
from .serializers import RegisterUserSerializer, RegisterStylistSerializer, UserSerializer, UserSerializerWithToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        
        for k, v in serializer.items():
            data[k] = v
        
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CustomUserCreate(APIView):
    # This class is for registering or creating new users
    permission_classes = [AllowAny]

    def post(self, request, format='json'):     
        serializer = RegisterUserSerializer(data=request.data)
        try:
            if serializer.is_valid():
                user = serializer.save()
                if user:
                    json = serializer.data
                    return Response(json, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            messsage = {'detail': 'user with this email or username or phone number exist'}
            return Response(messsage, status=status.HTTP_400_BAD_REQUEST)
            

class StylistCreateView(APIView):
    permission_classes = [AllowAny,]

    def post(self, request, format='json'):
        serializer = RegisterStylistSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class GetUserProfile(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    
    def get(self, request): 
        try:
            current_user = self.request.user
            serializer = UserSerializer(current_user, many=False)
            return Response(serializer.data)
        except :
            return Response("you are not logged in")
        

class UpdateUserProfile(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    
    def put(self, request): 
        user = self.request.user
        serializer = UserSerializerWithToken(user, many=False)
   
            
        data = self.request.data
        user.name = data['name']
        user.user_name = data['user_name']
        user.user_name = data['user_name']
        user.email = data["email"]
        user.phone_number = data["phone_number"]
        
        if data["password"] !=  '':
            user.password = make_password(data["password"])
        
      
        user.save()
        return Response(serializer.data)
        


            
     

        
 
class GetUsers(APIView):
    permission_classes = [IsAdminUser] 
    serializer_class = UserSerializer
    
    def get(self, request):
        users = NewUser.objects.all().filter()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
          
       