# backend/assessments/serializers.py
from rest_framework import serializers
from .models import ControlAssessment, Answer, Question



class ControlAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlAssessment
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'