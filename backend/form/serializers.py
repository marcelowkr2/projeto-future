from rest_framework import serializers
from .models import Formulario, Categoria, Pergunta, FormularioRespondido, Resposta
from users.models import CustomUser


class PerguntaSerializer(serializers.ModelSerializer):
    categoria = serializers.StringRelatedField()

    class Meta:
        model = Pergunta
        fields = ['id', 'codigo', 'questao', 'categoria']


class CategoriaSerializer(serializers.ModelSerializer):
    perguntas = PerguntaSerializer(many=True, read_only=True)

    class Meta:
        model = Categoria
        fields = ['id', 'nome', 'perguntas']


class FormularioSerializer(serializers.ModelSerializer):
    categorias = CategoriaSerializer(many=True, read_only=True)

    class Meta:
        model = Formulario
        fields = ['id', 'nome', 'categorias']


class RespostaSerializer(serializers.ModelSerializer):
    pergunta = serializers.PrimaryKeyRelatedField(queryset=Pergunta.objects.all())

    class Meta:
        model = Resposta
        fields = ['id', 'pergunta', 'politica', 'pratica', 'info_complementar', 'anexos']


class FormularioRespondidoSerializer(serializers.ModelSerializer):
    respostas = RespostaSerializer(many=True, read_only=True)
    formulario = FormularioSerializer(read_only=True)
    cliente = serializers.StringRelatedField()
    responsavel = serializers.StringRelatedField()

    class Meta:
        model = FormularioRespondido
        fields = [
            'id', 'cliente', 'formulario', 'responsavel',
            'status', 'progresso', 'versao', 'observacoes_pendencia',
            'respostas', 'criado_em', 'atualizado_em'
        ]