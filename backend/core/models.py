# backend/core/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Administrador'),
        ('auditor', 'Auditor'),
        ('empresa', 'Empresa Avaliada'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='empresa')

    def __str__(self):
        return self.username