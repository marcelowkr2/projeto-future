import os
import sys
import django
import random
from django.utils import timezone

# Configuração do ambiente Django
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from users.models import CustomUser
from form.models import Formulario, FormularioRespondido, Resposta
from assessments.models import Question

def seed_respostas():
    cliente = CustomUser.objects.filter(role="user").first()
    if not cliente:
        print("❌ Nenhum cliente com role='user' encontrado.")
        return

    formulario = Formulario.objects.first()
    if not formulario:
        print("❌ Nenhum formulário encontrado.")
        return

    formulario_respondido, created = FormularioRespondido.objects.get_or_create(
        cliente=cliente,
        formulario=formulario,
        versao=1,
        defaults={"status": "rascunho", "progresso": 0}
    )

    perguntas = Question.objects.all()
    if not perguntas.exists():
        print("❌ Nenhuma pergunta encontrada.")
        return

    count = 0
    for pergunta in perguntas:
        _, created = Resposta.objects.get_or_create(
            formulario_respondido=formulario_respondido,
            pergunta=pergunta,
            defaults={
                "usuario": cliente,
                "politica": str(random.randint(1, 5)),
                "pratica": str(random.randint(1, 5)),
                "info_complementar": "Simulação automática",
                "respondido_em": timezone.now()
            }
        )
        if created:
            count += 1

    print(f"✅ {count} respostas simuladas criadas para '{cliente.username}' no formulário '{formulario.nome}'.")

if __name__ == "__main__":
    seed_respostas()
