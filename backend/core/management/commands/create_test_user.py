# core/management/commands/create_test_user.py
from django.core.management.base import BaseCommand
from core.models import User

class Command(BaseCommand):
    help = 'Cria um usuário de teste'

    def handle(self, *args, **kwargs):
        User.objects.create_user(username='testuser', password='testpass')
        self.stdout.write(self.style.SUCCESS('Usuário de teste criado com sucesso!'))
