from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.db import models

# Gerenciador Personalizado para o CustomUser
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

# Modelo Personalizado de Usuário
class CustomUser(AbstractUser):
    """Modelo personalizado de usuário"""
    ROLE_CHOICES = [
        ('admin', 'Administrador'),
        ('security', 'Analista de Segurança'),
        ('user', 'Usuário Comum'),
    ]

    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='user')

    # Evitar conflitos com o related_name
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_groups',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_permissions',
        blank=True
    )

    objects = CustomUserManager()  # Associa o gerenciador personalizado

    def __str__(self):
        return self.username

    class Meta:
        permissions = [
            ("view_user", "Pode ver usuários"),
            ("change_user", "Pode alterar usuários"),
            ("delete_user", "Pode excluir usuários"),
            ("view_report", "Pode ver relatórios de segurança"),
            ("create_report", "Pode criar relatórios de segurança"),
            ("delete_report", "Pode excluir relatórios de segurança"),
        ]

# Modelo de Relatórios
class Report(models.Model):
    """Modelo de relatórios de segurança"""
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
