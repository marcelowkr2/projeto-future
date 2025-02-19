from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from config import views
from . import views
from rest_framework.routers import DefaultRouter
from .views import ControlAssessmentViewSet
from rest_framework_simplejwt.views import  TokenObtainPairView, TokenRefreshView
from .views import UserInfoView
from .views import ComplianceView
from .views import ValidateTokenView


router = DefaultRouter()
router.register(r'control-assessments', ControlAssessmentViewSet)

# Função de exemplo para home
def home(request):
    return HttpResponse("Bem-vindo à CyberSec Maturity Platform!")

urlpatterns = [
    # Rota da home
    path('', home, name='home'),

    path('', include(router.urls)),

    # Rota do painel administrativo
    path('admin/', admin.site.urls),

    path('assessments/', include('assessments.urls')),

    path('compliance/', ComplianceView.as_view(), name='compliance-list'),

    # Rotas de autenticação (Token JWT)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("auth/validate-token/", ValidateTokenView.as_view(), name="validate-token"),
    

    # Rota para criar relatórios
    path('create_report/', views.create_report, name='create_report'),

    # Inclusão das rotas da API em um arquivo separado
    path('api/', include('api.urls')),
    path('api/public/', views.public_view, name='public_view'),

    # Rota para acesso protegido
    path('api/protected/', views.protected_view, name='protected_view'),

    # Rota para acesso público
    path('api/public/', views.public_view, name='public_view'),

    path('', include('core.urls')),

     path('auth/user/', UserInfoView.as_view(), name='user_info'),

     path("api/maturity-results/", include("assessments.urls")),

      path("api/", include("assessments.urls")),  # Inclui as URLs do app assessments

      

]





