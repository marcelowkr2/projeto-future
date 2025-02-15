from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    """Modelo personalizado de usuário"""
    role = models.CharField(max_length=50, choices=[
        ('admin', 'Administrador'),
        ('security', 'Analista de Segurança'),
        ('user', 'Usuário Comum'),
    ], default='user')

    def __str__(self):
        return self.username
    
    class Report(models.Model):
    # Seus campos para o relatório
        title = models.CharField(max_length=100)
        content = models.TextField()

class Meta:
        permissions = [
            # Permissões de administrador
            ("view_user", "Pode ver usuários"),
            ("change_user", "Pode alterar usuários"),
            ("delete_user", "Pode excluir usuários"),               
            ("view_report", "Pode ver relatórios de segurança"),
            ("create_report", "Pode criar relatórios de segurança"),
            ("delete_report", "Pode excluir relatórios de segurança"),
            ("add_report", "Can add report"),
            ("view_report", "Can view report"),
        ]

class CustomUserManager(BaseUserManager):
        def create_user(self, username, password=None, **extra_fields):
            if not username:
                raise ValueError("O campo 'username' é obrigatório")
            user = self.model(username=username, **extra_fields)
            user.set_password(password)
            user.save(using=self._db)
            return user
    
        def create_superuser(self, username, password=None, **extra_fields):
            extra_fields.setdefault("is_staff", True)
            extra_fields.setdefault("is_superuser", True)
            return self.create_user(username, password, **extra_fields)

class User(AbstractUser):
    role_choices = (
        ('admin', 'Admin'),
        ('avaliador', 'Avaliador'),
        ('cliente', 'Cliente'),
    )
    role = models.CharField(max_length=20, choices=role_choices, default='cliente')

    objects = CustomUserManager()

    def __str__(self):
        return self.username  # Adicione as permissões que você precisa