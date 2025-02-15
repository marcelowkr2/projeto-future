from django.contrib.auth.decorators import permission_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import render
import logging
from django.core.exceptions import PermissionDenied

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({"message": "Você está autenticado!"})

@permission_required('users.add_report', raise_exception=True)
def create_report(request):
    # Sua lógica para criar o relatório
    return render(request, 'template.html')  # Substitua 'template.html' pelo template que você está usando

logger = logging.getLogger(__name__)

@permission_required('users.add_report', raise_exception=True)
def create_report(request):
    # Lógica de criação de relatórios
    logger.info(f"Relatório criado por {request.user.username}")
    return render(request, 'template.html')  # Substitua 'template.html' pelo template que você está usando

def some_view(request):
    try:
        # Lógica de processamento
        pass
    except Exception as e:
        logger.error(f"Erro ao processar a requisição: {str(e)}")
        raise PermissionDenied("Você não tem permissão para acessar esta página.")
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
@permission_required('core.view_avaliacao', raise_exception=True)
def get_avaliacoes(request):
    return Response({"message": "Acesso autorizado para avaliações"}) 
#