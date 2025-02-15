from rest_framework import viewsets
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
import logging
from .models import Assessment
from .permissions import IsAdmin, IsEvaluator
User = get_user_model()

#🔹 O que isso faz?
#✅ Quando um login falha, registramos no log de segurança.
#✅ Salvamos o IP do atacante para futura análise.
from django.contrib.auth.signals import user_login_failed

logger = logging.getLogger('django.security')

def login_failed(sender, credentials, request, **kwargs):
    logger.warning(f"Tentativa de login falhou para o usuário: {credentials.get('username', 'DESCONHECIDO')} - IP: {request.META.get('REMOTE_ADDR')}")

user_login_failed.connect(login_failed)
#==============================================================================================

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite visualizar ou editar usuários.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Apenas usuários autenticados podem acessar
    

