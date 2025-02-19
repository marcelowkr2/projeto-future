from django.contrib import admin
from django.urls import path, include
from .views import MaturityResultsView
from rest_framework.routers import DefaultRouter
from .views import ExecutiveReportView
from .views import save_assessment, get_maturity_results, ControlAssessmentViewSet, RiskAssessmentViewSet, ControlAssessmentView

router = DefaultRouter()
router.register(r'control-assessments', ControlAssessmentViewSet)
router.register(r'risk-assessments', RiskAssessmentViewSet)  # Adiciona o RiskAssessmentViewSet aqui
router.register(r'control-assessments', ControlAssessmentViewSet, basename='control-assessment')

urlpatterns = [
    path('api/save-assessments/', save_assessment, name='save_assessment'),
    path('api/maturity-results/', get_maturity_results, name='get_maturity_results'),
    path("api/maturity-results/", MaturityResultsView.as_view(), name="maturity-results"),
    path('api/get-maturity-results/', get_maturity_results, name='get_maturity_results'),
    path('', include(router.urls)),  # Inclui todas as URLs do router
    path('api/', include(router.urls)),
    path('api/control-assessments/', ControlAssessmentView.as_view(), name='control-assessments'),
    path('executive-report/', ExecutiveReportView.as_view(), name='executive-report'),
    path('admin/', admin.site.urls),    
]
