from django.urls import path
from rest_framework_simplejwt.views import ( TokenObtainPairView, TokenRefreshView,)
from .views import ( CustomUserCreate,StylistCreateView, BlacklistTokenUpdateView,
                    MyTokenObtainPairView, GetUserProfile, AdminGetUsers, UpdateUserProfile, AdminDeleteUser, ForgetPasswordSendOtp,
                    ResetPassword, AdminGetPutUserInformation)

app_name = 'users'

urlpatterns = [
    # token authentication
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), # login endpoint
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('forget-password/', ForgetPasswordSendOtp.as_view()),
    path('reset-password/', ResetPassword.as_view()),
    

    
    path('stylist_register/', StylistCreateView.as_view(), name="create_user"),
    
    path('profile/update/', UpdateUserProfile.as_view(), name="update_profile"),
    path('all_users/', AdminGetUsers.as_view(), name="users"),
    path('delete/<str:user_id>/', AdminDeleteUser.as_view(), name="delete_user"),
    path('edit/<str:user_id>/', AdminGetPutUserInformation.as_view(), name="delete_user"),
    path('<str:user_id>/', GetUserProfile.as_view(), name="user_profile"),
    
    
]