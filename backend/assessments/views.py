from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import ControlAssessment, RiskAssessment, Question
from .serializers import ControlAssessmentSerializer, RiskAssessmentSerializer, QuestionSerializer

class ControlAssessmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar avaliações de controle.
    Permite operações CRUD (listar, criar, atualizar, deletar).
    """
    queryset = ControlAssessment.objects.all()
    serializer_class = ControlAssessmentSerializer
    permission_classes = [IsAuthenticated]  # Garante que apenas usuários autenticados possam acessar

class RiskAssessmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet para avaliações de risco.
    """
    queryset = RiskAssessment.objects.all()
    serializer_class = RiskAssessmentSerializer
    permission_classes = [IsAuthenticated]

class QuestionListView(APIView):
    """
    API para listar todas as perguntas disponíveis na avaliação.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

class ExecutiveReportView(APIView):
    """
    Gera um relatório executivo com base nas avaliações de maturidade.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Implementação do relatório executivo
        data = {"message": "Relatório executivo gerado com sucesso!"}
        return Response(data)

class SaveAssessmentView(APIView):
    """
    Salva os resultados da avaliação de maturidade.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Aqui você pode processar e salvar os dados da avaliação
        return Response({"message": "Avaliação salva com sucesso!"})
