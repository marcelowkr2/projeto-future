# assessments/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ControlAssessmentViewSet
from .views import GenerateReportView
from .views import QuestionList

router = DefaultRouter()
router.register(r'control-assessments', ControlAssessmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
     path('control-assessments/<int:assessment_id>/generate-report/', GenerateReportView.as_view(), name='generate-report'),
      path("questions/", QuestionList.as_view(), name="question-list"),
]