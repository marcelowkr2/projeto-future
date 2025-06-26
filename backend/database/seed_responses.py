import os
import sys
import django
import random
from django.contrib.auth import get_user_model

# Configuração do ambiente Django
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from assessments.models import Question, AssessmentResponse

User = get_user_model()

def seed_responses():
    # Pegar todos os usuários
    users = User.objects.all()
    if not users.exists():
        print("⚠ Nenhum usuário encontrado. Crie alguns usuários primeiro.")
        return

    # Pegar todas as questões
    questions = Question.objects.all()
    if not questions.exists():
        print("⚠ Nenhuma questão encontrada. Execute primeiro o seeder de questões.")
        return

    total_questions = questions.count()
    print(f"📊 Total de questões no sistema: {total_questions}")

    for user in users:
        created_for_user = 0
        
        for question in questions:
            if not AssessmentResponse.objects.filter(user=user, question=question).exists():
                try:
                    AssessmentResponse.objects.create(
                        user=user,
                        question=question,
                        politica=random.randint(1, 5),
                        pratica=random.randint(1, 5)
                    )
                    created_for_user += 1
                except Exception as e:
                    print(f"⚠ Erro ao criar resposta para usuário {user.username}, questão {question.id}: {e}")
        
        # Mostrar estatísticas por usuário
        print(f"✅ {created_for_user} respostas criadas para o usuário {user.username}")
        
        # Se nenhuma resposta foi criada (porque já existiam todas)
        if created_for_user == 0:
            existing_responses = AssessmentResponse.objects.filter(user=user).count()
            print(f"ℹ O usuário {user.username} já tinha {existing_responses}/{total_questions} respostas")

    # Estatísticas finais
    total_responses = AssessmentResponse.objects.count()
    total_users = users.count()
    print(f"\n🎉 Concluído! Resumo final:")
    print(f"- Total de usuários processados: {total_users}")
    print(f"- Total de questões no sistema: {total_questions}")
    print(f"- Total de respostas existentes no banco: {total_responses}")
    print(f"- Média de respostas por usuário: {total_responses/total_users:.1f}")

if __name__ == "__main__":
    seed_responses()