from django.contrib import admin
from django.urls import path, include
from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('create_report/', views.create_report, name='create_report'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

from django.urls import path
from .views import protected_view

urlpatterns += [
    path('api/protected/', protected_view, name='protected_view'),
]

from django.contrib import admin
from django.urls import path, include




