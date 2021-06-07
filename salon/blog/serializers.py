from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.user_name')

    class Meta:
        model = Post
        fields = ('id', 'content', 'author', 'image', 'likes','status' )





