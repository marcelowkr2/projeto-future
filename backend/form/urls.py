from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FormularioViewSet, PerguntaViewSet, FormularioRespondidoViewSet

router = DefaultRouter()
router.register(r'formularios', FormularioViewSet)
router.register(r'perguntas', PerguntaViewSet)
router.register(r'formularios-respondidos', FormularioRespondidoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
