from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from .models import ControlAssessment, RiskAssessment
from .serializers import ControlAssessmentSerializer, RiskAssessmentSerializer
import json
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status

from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Question
from .serializers import QuestionSerializer

class QuestionListView(APIView):
    def get(self, request):
        questions = Question.objects.all()
        print("QUESTÕES ENCONTRADAS:", questions)  # Depuração no terminal
        serializer = QuestionSerializer(questions, many=True)
        return Response({"questions": serializer.data})


class ExecutiveReportView(APIView):
    def get(self, request):
        assessments = ControlAssessment.objects.all()

        # Se não houver avaliações, evitar erro de divisão por zero
        if not assessments.exists():
            return Response({
                "message": "Nenhuma avaliação encontrada.",
                "averageMaturity": 0,
                "lowMaturityControls": [],
                "recommendations": []
            }, status=status.HTTP_200_OK)

        # Calcula a média de maturidade
        total_score = sum(a.score for a in assessments if a.score is not None)
        average_maturity = total_score / len(assessments) if total_score else 0

        # Identifica áreas de baixo desempenho (pontuação < 3)
        low_maturity_controls = [
            {
                "control_id": a.question.id,  # Corrigido: Usar `id` no lugar de `control_id`
                "average_maturity": a.score,
            }
            for a in assessments if a.score and a.score < 3
        ]

        recommendations = [
            "Implementar automação para inventário de ativos.",
            "Melhorar o controle de acesso físico e lógico.",
            "Integrar inteligência artificial para detecção de anomalias.",
            "Revisar políticas de segurança periodicamente.",
        ]

        report = {
            "averageMaturity": round(average_maturity, 2),
            "lowMaturityControls": low_maturity_controls,
            "recommendations": recommendations,
        }

        return Response(report, status=status.HTTP_200_OK)

class ControlAssessmentView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Pegando os parâmetros da query string
        status = request.query_params.get('status', None)
        date_from = request.query_params.get('date_from', None)
        date_to = request.query_params.get('date_to', None)
        category = request.query_params.get('category', None)

        # Construindo o queryset com base nos parâmetros recebidos
        assessments = ControlAssessment.objects.all()

        if status:
            assessments = assessments.filter(status=status)

        if category:
            assessments = assessments.filter(category=category)

        if date_from:
            assessments = assessments.filter(date__gte=date_from)

        if date_to:
            assessments = assessments.filter(date__lte=date_to)

        # Serializando as avaliações e retornando a resposta
        serialized_assessments = ControlAssessmentSerializer(assessments, many=True)
        return Response(serialized_assessments.data)

class RiskAssessmentViewSet(viewsets.ModelViewSet):
    queryset = RiskAssessment.objects.all()
    serializer_class = RiskAssessmentSerializer

@csrf_exempt
def save_assessment(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            responses = data.get('responses')
            maturity_results = data.get('maturityResults')

            # Exemplo de salvamento no banco (ajuste conforme necessário)
            # Assessment.objects.create(responses=responses, maturity_results=maturity_results)

            return JsonResponse({'status': 'success', 'message': 'Avaliação salva com sucesso!'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Método não permitido'}, status=405)

class ControlAssessmentViewSet(viewsets.ModelViewSet):
    queryset = ControlAssessment.objects.all()
    serializer_class = ControlAssessmentSerializer
