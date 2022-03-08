from django.urls import path
from .views import MyObtainTokenPairView, RegisterView, getRoutes
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('', getRoutes),
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('obtain_username/', MyObtainTokenPairView.as_view(), name='obtain_username'),
]