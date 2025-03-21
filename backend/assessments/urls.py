from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from assessments.views import ExecutiveReportView
from assessments.views import save_assessment, ControlAssessmentViewSet, RiskAssessmentViewSet, ControlAssessmentView, get_questions

router = DefaultRouter()
router.register(r'control-assessments', ControlAssessmentViewSet)
router.register(r'risk-assessments', RiskAssessmentViewSet)  # Adiciona o RiskAssessmentViewSet aqui
router.register(r'control-assessments', ControlAssessmentViewSet, basename='control-assessment')

urlpatterns = [
    path('api/save-assessments/', save_assessment, name='save_assessment'),
    path('', include(router.urls)),  # Inclui todas as URLs do router
    path('api/', include(router.urls)),
    path('api/control-assessments/', ControlAssessmentView.as_view(), name='control-assessments'),
    path('executive-report/', ExecutiveReportView.as_view(), name='executive-report'),
    path("api/questions/", get_questions, name="get_questions"),
       
]
