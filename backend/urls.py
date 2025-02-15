# backend/urls.py
from django.urls import path, include

urlpatterns = [
    path('api/', include('assessments.urls')),
]
