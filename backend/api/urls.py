from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ControlAssessmentViewSet
import api.views as views

router = DefaultRouter()
router.register(r'control-assessments', ControlAssessmentViewSet, basename='control-assessment')

urlpatterns = [
    path('control-assessments/', include(router.urls)),
]

path(
    'control-assessments/', 
    views.ControlAssessmentViewSet.as_view({'get': 'list', 'post': 'create'}), 
    name='control-assessment-list'
),
