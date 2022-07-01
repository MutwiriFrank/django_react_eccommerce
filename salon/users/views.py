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

    def post(self, request, format='json'):   

    
        def validate(self, attrs):
        

            try:
                data = super().validate(attrs)

                serializer = UserSerializerWithToken(self.user).data
                
                for k, v in serializer.items():
                    data[k] = v
                
                return data

            except:
                    messsage = {'detail': 'user does not exist'}
                    return Response(messsage, status=status.HTTP_400_BAD_REQUEST)
            

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
                    serializer = UserSerializerWithToken(user)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
                messsage = {'detail': 'user with this email  or phone number exist'}
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
    
    def get(self, request, user_id): 
        try:
            user = NewUser.objects.get(id=user_id)
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data)
        except :
            return Response("you are not logged in")
        

class UpdateUserProfile(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    
    def put(self, request): 
        user = self.request.user
        
        data = self.request.data
        user.user_name = data['user_name']
        user.email = data["email"]
        user.phone_number = data["phone_number"]
        
        if data["password"] !=  '':
            user.password = make_password(data["password"])
        
        user.save()
        serializer = UserSerializerWithToken(user, many=False)

        return Response(serializer.data, status=status.HTTP_200_OK)
        

class AdminGetUsers(APIView):
    permission_classes = [IsAdminUser] 
    serializer_class = UserSerializer
    def get(self, request):
        users = NewUser.objects.all().filter(is_active=True)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    

class AdminDeleteUser(APIView):
    permission_classes = [IsAdminUser, ]
    serializer_class = [ UserSerializer, ]

    def delete(self, request, user_id):
        try:
            user = NewUser.objects.get(id=user_id)
        except:
            return Response({"detail":"User does not exist"}, status=status.HTTP_200_OK)
        user.is_active = False
        user.save()
        return Response({"detail":"deactivated successfully"}, status=status.HTTP_200_OK)


class AdminGetPutUserInformation(APIView):
    permission_classes = [ IsAdminUser ]
    serializer_class = [ UserSerializer ]

    def put(self, request, user_id):
        try:
            user = NewUser.objects.get(id=user_id)
        except:
            return Response({"detail":"User does not exist"}, status=status.HTTP_200_OK)

        data = self.request.data
        user.user_name = data['user_name']
        user.email = data["email"]
        user.phone_number = data["phone_number"]
        
        user.save()
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

        