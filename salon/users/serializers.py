from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import NewUser, Stylist

# customer registration


class RegisterUserSerializer(ModelSerializer):
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    first_name = serializers.CharField(required=True)
    phone_number = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'first_name', 'phone_number', 'password', )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  #instance = user
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class UserSerializer(ModelSerializer):

    class Meta:
        model =NewUser
        fields = ('id', 'user_name')


# stylist registration


class RegisterStylistSerializer(ModelSerializer):
    first_name = serializers.CharField(required=True)
    user_name =  serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    phone_number = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model= Stylist
        fields = ('email', 'user_name', 'first_name', 'phone_number', 'password',)
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = self.validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # stylist

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


