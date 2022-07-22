from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated,  IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.views import ( TokenObtainPairView, TokenRefreshView,)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers



from django.contrib.auth.hashers import make_password   
from django.http import HttpResponse
from django.core.mail import BadHeaderError, send_mail
from django.contrib.auth.hashers import make_password   
from django.core.mail import EmailMessage
from django.conf import settings

from .models import NewUser
from .serializers import RegisterUserSerializer, RegisterStylistSerializer, UserSerializer, UserSerializerWithToken
  
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    print("am yet to  getting user data")

    def validate(self, attrs):
        
    

        try:
            print("am getting user data")
            data = super().validate(attrs)
            print("am getting user datayyyyyyyyyyyyy")

            serializer = UserSerializerWithToken(self.user).data
            
            for k, v in serializer.items():
                data[k] = v
            
            print("user data", data)
            return data
            

        except:
           raise serializers.ValidationError({'detail':'Wrong Username or password!'})
       
            

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


class ForgetPasswordSendOtp(APIView):
    """
     Users  who have forgot password to enter their email and OTP will be sent to their emails
    """
   
    def post(self, request):
        data = request.data
        email = data['email']
        user = NewUser.objects.get(email=email)
        if NewUser.objects.filter(email=email).exists():
            user = user
            # send email with otp
            subject ="Shanga Password Reset"

            user_email = user.email

            body = f"Use {user.otp} to reset your password "

            email = EmailMessage(subject, body, settings.EMAIL_HOST_USER, ['mutwirifranco@gmail.com', user_email])

            email.fail_silently = False

            # email.send()
            
            try:
                email.send()
            except BadHeaderError:
                return HttpResponse('Invalid header found.')
                
        
            message = {
                'detail': 'Success Message'}
            return Response(message, status=status.HTTP_200_OK)
        else:
            message = {
                'detail': 'Email or Phone Number not valid'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class ResetPassword(APIView):
    """
        Users to enter email, OTP and new password inorderto reset their pasword
    """
    def put(self, request):
        data = request.data
        user = NewUser.objects.get(email=data['email'])
        if user.is_active:
            # Check if otp is valid
            if data['otp'] == user.otp:

                new_password = data['password']
                if new_password != '':
                    # Change Password
                    user.set_password(data['password'])
                    user.save() # Here user otp will also be changed on save automatically 
                    return Response('Your password has been reset ')
                else:
                    message = {
                        'detail': 'Password cant be empty'}
                    return Response(message, status=status.HTTP_400_BAD_REQUEST)
            else:
                message = {
                    'detail': 'OTP did not matched'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)
        else:
            message = {
                'detail': 'This account is not active'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)



        