from django.urls import path, include
from rest_framework.routers import DefaultRouter
from assessments.views import (
    ExecutiveReportView,
    SaveAssessmentView,
    ControlAssessmentViewSet,
    RiskAssessmentViewSet,
    QuestionListView,
)

# Criando o roteador para as views baseadas em ViewSets
router = DefaultRouter()
router.register(r'control-assessments', ControlAssessmentViewSet, basename='control-assessment')
router.register(r'risk-assessments', RiskAssessmentViewSet)

# Definição das URLs da API
urlpatterns = [
    path('api/', include(router.urls)),  # Inclui todas as URLs geradas pelo router do DRF
    path('api/save-assessments/', SaveAssessmentView.as_view(), name='save-assessment'),
    path('api/executive-report/', ExecutiveReportView.as_view(), name='executive-report'),
    path('api/questions/', QuestionListView.as_view(), name='question-list'),
]
