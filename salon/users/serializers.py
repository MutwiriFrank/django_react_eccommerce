from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from rest_framework_simplejwt import tokens
from .models import NewUser, Stylist

# customer registration


class UserSerializer(ModelSerializer):
    pk = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model =NewUser
        fields = ('id', 'pk', 'isAdmin', 'user_name', 'email', 'name', "phone_number")
        
        
    def get_pk(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
   
    
    class Meta:
        model = NewUser
        fields = ('id', 'pk', 'isAdmin', 'user_name', 'email', 'name',"phone_number", "password" )
        
    def get_pk(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff
        
    


class RegisterUserSerializer(ModelSerializer):
    email = serializers.EmailField(required=True )
    user_name = serializers.CharField(required=True)
    name = serializers.CharField(required=True)
    phone_number = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'name', 'phone_number', 'password', )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  #instance = user
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


# stylist registration

class RegisterStylistSerializer(ModelSerializer):
    name = serializers.CharField(required=True)
    user_name =  serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    phone_number = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model= Stylist
        fields = ('email', 'user_name', 'name', 'phone_number', 'password', 'location')
        extra_kwargs = {'password': {'write_only': True}}

    
    def create(self, validated_data):
        password = self.validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # stylist

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


