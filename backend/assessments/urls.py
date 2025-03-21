from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from assessments.views import (
    ExecutiveReportView,
    save_assessment,
    ControlAssessmentViewSet,
    RiskAssessmentViewSet,
    ControlAssessmentView,
    QuestionListView,
)

router = DefaultRouter()
router.register(r'control-assessments', ControlAssessmentViewSet, basename='control-assessment')
router.register(r'risk-assessments', RiskAssessmentViewSet)

urlpatterns = [
    path('api/', include(router.urls)),  # Inclui todas as URLs do DRF
    path('api/save-assessments/', save_assessment, name='save_assessment'),
    path('api/control-assessments/', ControlAssessmentView.as_view(), name='control-assessments'),
    path('api/executive-report/', ExecutiveReportView.as_view(), name='executive-report'),
    path('api/questions/', QuestionListView.as_view(), name='question-list'),  # Corrigido para evitar conflito
]
