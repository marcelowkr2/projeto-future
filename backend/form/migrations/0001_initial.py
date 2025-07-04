# Generated by Django 5.2.2 on 2025-06-04 19:10

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Formulario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=255)),
                ('formulario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categorias', to='form.formulario')),
            ],
            options={
                'unique_together': {('nome', 'formulario')},
            },
        ),
        migrations.CreateModel(
            name='FormularioRespondido',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('rascunho', 'Rascunho'), ('analise', 'Em Análise'), ('pendente', 'Pendente'), ('concluido', 'Concluído')], default='rascunho', max_length=20)),
                ('progresso', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
                ('versao', models.PositiveIntegerField(default=1)),
                ('observacoes_pendencia', models.TextField(blank=True, null=True)),
                ('criado_em', models.DateTimeField(auto_now_add=True)),
                ('atualizado_em', models.DateTimeField(auto_now=True)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='formularios_respondidos', to=settings.AUTH_USER_MODEL)),
                ('formulario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='formularios_respondidos', to='form.formulario')),
                ('responsavel', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='formularios_designados', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('cliente', 'formulario', 'versao')},
            },
        ),
        migrations.CreateModel(
            name='Pergunta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('questao', models.TextField()),
                ('codigo', models.CharField(max_length=50, unique=True)),
                ('categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='perguntas', to='form.categoria')),
                ('formulario', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='perguntas', to='form.formulario')),
            ],
        ),
        migrations.CreateModel(
            name='Resposta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('politica', models.IntegerField(blank=True, null=True)),
                ('pratica', models.IntegerField(blank=True, null=True)),
                ('info_complementar', models.TextField(blank=True, null=True)),
                ('anexos', models.FileField(blank=True, null=True, upload_to='anexos/')),
                ('respondido_em', models.DateTimeField(auto_now=True)),
                ('formulario_respondido', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='respostas', to='form.formulariorespondido')),
                ('pergunta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='form.pergunta')),
                ('usuario', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('formulario_respondido', 'pergunta')},
            },
        ),
    ]
