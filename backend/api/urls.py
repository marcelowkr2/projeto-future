# backend/api/urls.py
from django.urls import path
from . import views  # Importe as views da API

urlpatterns = [
    # Defina as rotas da API aqui
    path('control-assessments/', views.ControlAssessmentViewSet.as_view(), name='control-assessment-list'),
    path('questions/', views.QuestionList.as_view(), name='question-list'),
]