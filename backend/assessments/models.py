from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model


class Question(models.Model):
    CATEGORY_CHOICES = [
        ("GV", "Govern"),
        ("ID", "Identity"),
        ("PR", "Protect"),
        ("DE", "Detect"),
        ("RS", "Response"),
        ("RC", "Recovery"),
    ]

    LEVEL_CHOICES = [
        (1, "Inicial"),
        (2, "Gerenciado"),
        (3, "Definido"),
        (4, "Repetido"),
        (5, "Otimizado"),
    ]

    class Assessment(models.Model):
     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='core_assessments')
    # Outros campos...

    text = models.TextField()  # Texto da pergunta
    category = models.CharField(max_length=2, choices=CATEGORY_CHOICES)
    weight = models.DecimalField(max_digits=5, decimal_places=2, default=1.0)  # Peso da pergunta

    def __str__(self):
        return f"{self.get_category_display()} - {self.text[:30]}..."

class ControlAssessment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='control_assessments')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='assessments')
    policy_maturity = models.IntegerField(choices=Question.LEVEL_CHOICES)
    practice_maturity = models.IntegerField(choices=Question.LEVEL_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # Pontuação total

    def __str__(self):
        return f"{self.question.category} - {self.question.text[:30]}..."

    def calculate_score(self):
        # Calcula a pontuação com base nos níveis de maturidade e no peso da pergunta
        policy_score = self.policy_maturity * self.question.weight
        practice_score = self.practice_maturity * self.question.weight
        self.score = (policy_score + practice_score) / 2  # Média simples
        self.save()

    class Answer(models.Model):
        text = models.CharField(max_length=255)
        is_correct = models.BooleanField(default=False)