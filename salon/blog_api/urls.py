from django.urls import path, include
from .views import PostCreateList, PostRUD, CommentList, CommentDetail

app_name = 'blog_api'
urlpatterns =[
    path('', PostCreateList.as_view(), name= 'listcreate'),
    path('<int:pk>/', PostRUD.as_view(), name='postedit' ),
    #path('comments/', CommentList.as_view()),
    #path('comments/<int:pk>/', CommentDetail.as_view()),

]


