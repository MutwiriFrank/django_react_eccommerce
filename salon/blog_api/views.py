from rest_framework import generics
from blog.models  import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from rest_framework.permissions import IsAdminUser, DjangoModelPermissionsOrAnonReadOnly,\
    DjangoModelPermissions, BasePermission, SAFE_METHODS, IsAuthenticatedOrReadOnly
from rest_framework.response import Response


# custom permission to let users perform specific task on their own objects
class PostUserWritePermission(BasePermission):
    """
        Object-level permission to only allow owners of an object to edit it.

    """
    def has_object_permission(self, request, view, obj):
        """
            Read permissions are allowed to any request,
            so we'll always allow GET, HEAD or OPTIONS requests.
        """
        if request.method in SAFE_METHODS:
            # SAFE_METHODS, which is a tuple containing 'GET', 'OPTIONS' and 'HEAD'.

            return True
        # obj author should be equal to the logged in user
        return obj.author == request.user


class PostCreateList(generics.ListCreateAPIView):

    '''
    DjangoModelPermissionsOrAnonReadOnly will allow user to access as of permisions set in django admin
    oranonreadonly means anonymous users can only read

    '''

    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Post.postobjects.all() # using custom model manager
    serializer_class = PostSerializer

    def get_queryset(self):
        """
        This view should return a list of all posts
        whose status are published --- model manager
        """
        queryset = Post.postobjects.all()

        return queryset
 

class PostRUD(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
    """"
    This function is supposed to perfom Retrive, update and desstroy
    """
    permission_classes = [PostUserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [PostUserWritePermission]

