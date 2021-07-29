from django.urls import path
from rest_framework_simplejwt.views import ( TokenObtainPairView, TokenRefreshView,)
from .views import ( CustomUserCreate,StylistCreateView, BlacklistTokenUpdateView,
                    MyTokenObtainPairView, GetUserProfile, GetUsers, UpdateUserProfile, DeleteUser)


app_name = 'users'

urlpatterns = [
    # token authentication
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), # login endpoint
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    
    path('stylist_register/', StylistCreateView.as_view(), name="create_user"),
    path('profile/', GetUserProfile.as_view(), name="user_profile"),
    path('profile/update/', UpdateUserProfile.as_view(), name="update_profile"),
    path('all_users/', GetUsers.as_view(), name="users"),
    path('delete/<str:user_id>/', DeleteUser.as_view(), name="delete_user"),
    
    
]