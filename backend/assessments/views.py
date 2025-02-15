# assessments/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import ControlAssessment, Answer
from rest_framework.permissions import IsAuthenticated
from .serializers import ControlAssessmentSerializer
from rest_framework.views import APIView
from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from rest_framework import generics
from .models import Question
from .serializers import QuestionSerializer

class ControlAssessmentViewSet(viewsets.ModelViewSet):
    queryset = ControlAssessment.objects.all()
    serializer_class = ControlAssessmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Salva a avaliação e calcula a pontuação
        assessment = serializer.save(user=self.request.user)
        self.calculate_score(assessment)

    def calculate_score(self, assessment):
        answers = assessment.answers.all()
        total_weight = sum(a.question.weight for a in answers)
        total_score = sum(a.value * a.question.weight for a in answers)
        assessment.score = (total_score / total_weight) * 100 if total_weight > 0 else 0
        assessment.save()

    class QuestionList(generics.ListAPIView):
     queryset = Question.objects.all()
     serializer_class = QuestionSerializer


    class GenerateReportView(APIView):
        def get(self, request, assessment_id):
            buffer = BytesIO()
            p = canvas.Canvas(buffer, pagesize=letter)
            p.drawString(100, 750, f"Relatório de Avaliação #{assessment_id}")
            p.showPage()
            p.save()
            buffer.seek(0)
            return Response(buffer.getvalue(), content_type="application/pdf")