from rest_framework import serializers
from blog.models import Post, Comment
from users.models import NewUser


class CommentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='author.user_name')

    class Meta:
        model = Comment
        fields = ['id', 'body', 'author', 'post']

    def get_author(self, obj):
        return obj.author.user_name


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.user_name')

    class Meta:
        model = Post
        fields = ('id', 'content', 'author', 'image', 'likes', 'status',  )


class UserSerializer(serializers.ModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = NewUser
        fields = ['id', 'username', 'posts', 'comments']



