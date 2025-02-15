# backend/api/views.py
from rest_framework import viewsets
from assessments.models import ControlAssessment, Question
from assessments.serializers import ControlAssessmentSerializer, QuestionSerializer

class ControlAssessmentViewSet(viewsets.ModelViewSet):
    queryset = ControlAssessment.objects.all()
    serializer_class = ControlAssessmentSerializer

class QuestionList(viewsets.ReadOnlyModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer