from django.contrib.auth.models import Group, Permission
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.contenttypes.models import ContentType
from django.apps import apps  # Importação atrasada dos modelos
from django.contrib.auth.decorators import permission_required


@receiver(post_migrate)
def create_user_groups(sender, **kwargs):
    """Cria grupos de usuários automaticamente após as migrações"""
    if sender.name == "users":  # Garante que só roda para o app 'users'
        CustomUser = apps.get_model('users', 'CustomUser')  # Importação atrasada

        # Criar grupos
        admin_group, _ = Group.objects.get_or_create(name="Administrador")
        security_group, _ = Group.objects.get_or_create(name="Analista de Segurança")
        user_group, _ = Group.objects.get_or_create(name="Usuário Comum")

        # Definir permissões
        content_type = ContentType.objects.get_for_model(CustomUser)
        
        view_permission = Permission.objects.get(codename='view_customuser', content_type=content_type)
        change_permission = Permission.objects.get(codename='change_customuser', content_type=content_type)

        admin_group.permissions.add(view_permission, change_permission)
        security_group.permissions.add(view_permission)

         # Atribuir permissões
        permission_view = Permission.objects.get(codename='view_report', content_type=content_type)
        permission_create = Permission.objects.get(codename='create_report', content_type=content_type)
        permission_delete = Permission.objects.get(codename='delete_report', content_type=content_type)

        from django.contrib.auth.decorators import permission_required
from django.shortcuts import render

# A view protegida com permissão
@permission_required('users.create_report', raise_exception=True)
def create_report(request):
    # Lógica para criação do relatório
    return render(request, 'create_report.html')

