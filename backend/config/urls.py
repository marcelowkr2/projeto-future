from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    home,
    public_view,
    protected_view,
    UserInfoView,
    ComplianceView,
    ValidateTokenView
)

urlpatterns = [
    # Rota da home
    path('', home, name='home'),

    path("api/form/", include("form.urls")),

    
    # Painel administrativo
    path('admin/', admin.site.urls),
    
    # Rotas de autenticação JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/validate-token/', ValidateTokenView.as_view(), name='validate-token'),
    path('auth/user/', UserInfoView.as_view(), name='user_info'),
    
    # Rotas de compliance
    path('compliance/', ComplianceView.as_view(), name='compliance-list'),
    
    # Rotas públicas/protegidas
    path('api/public/', public_view, name='public_view'),
    path('api/protected/', protected_view, name='protected_view'),
    
    # Inclusão das rotas dos apps
    path('assessments/', include('assessments.urls')),
    path('api/', include('api.urls')),
    path('', include('core.urls')),
]