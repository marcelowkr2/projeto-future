from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Formulario, Pergunta, FormularioRespondido, Resposta
from .serializers import (
    FormularioSerializer,
    PerguntaSerializer,
    FormularioRespondidoSerializer,
    RespostaSerializer
)


class FormularioViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Formulario.objects.all()
    serializer_class = FormularioSerializer
    permission_classes = [IsAuthenticated]


class PerguntaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Pergunta.objects.all()
    serializer_class = PerguntaSerializer
    permission_classes = [IsAuthenticated]


class FormularioRespondidoViewSet(viewsets.ModelViewSet):
    queryset = FormularioRespondido.objects.all()
    serializer_class = FormularioRespondidoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(cliente=self.request.user)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def responder(self, request, pk=None):
        formulario = self.get_object()
        respostas_data = request.data.get("respostas", [])

        for resposta in respostas_data:
            pergunta_id = resposta.get("pergunta")
            politica = resposta.get("politica")
            pratica = resposta.get("pratica")
            info = resposta.get("info_complementar", "")
            anexo = resposta.get("anexos", None)

            resposta_obj, _ = Resposta.objects.update_or_create(
                formulario_respondido=formulario,
                pergunta_id=pergunta_id,
                defaults={
                    "usuario": request.user,
                    "politica": politica,
                    "pratica": pratica,
                    "info_complementar": info,
                    "anexos": anexo,
                },
            )

        return Response({"message": "Respostas salvas com sucesso."}, status=status.HTTP_200_OK)
