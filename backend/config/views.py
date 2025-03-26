# config/views.py
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

def home(request):
    return HttpResponse("Bem-vindo à CyberSec Maturity Platform!")

def public_view(request):
    return HttpResponse("Esta é uma visualização pública")

def protected_view(request):
    return HttpResponse("Esta é uma visualização protegida")

class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({
            'username': request.user.username,
            'email': request.user.email
        })

class ComplianceView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({"message": "Dados de compliance"})

class ValidateTokenView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({"valid": True})