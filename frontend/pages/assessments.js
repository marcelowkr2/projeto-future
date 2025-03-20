import React, { useState } from "react";
import { useRouter } from "next/router"; // Usando o roteamento do Next.js
import API from "../services/api";

const Assessment = () => {
  const [responses, setResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [executiveReport, setExecutiveReport] = useState(null);
  const router = useRouter(); // Hook do Next.js para redirecionamento

  // Função para atualizar as respostas
  const handleResponseChange = (questionId, type, level) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: {
        ...prevResponses[questionId],
        [type]: level,
      },
    }));
  };

  // Função para enviar o formulário
  const handleSubmit = async () => {
    // Verificar se todas as perguntas foram respondidas
    const unansweredQuestions = questions.filter(
      (q) => !responses[q.id]?.politica || !responses[q.id]?.pratica
    );
    if (unansweredQuestions.length > 0) {
      alert(`Por favor, responda todas as questões.`);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);
    setExecutiveReport(null); // Resetando o relatório antes de gerar novo

    try {
      // Calcula a maturidade média
      const maturityResults = calculateMaturity(responses, questions);
      const payload = {
        responses,
        maturityResults,
      };

      // Envia os dados da avaliação para o backend
      const response = await API.post("/assessments/api/save-assessments/", payload);
      console.log("Resposta do backend:", response.data);

      // Gera o relatório executivo
      const report = generateExecutiveReport(maturityResults);
      setExecutiveReport(report);

      setSubmitSuccess(true);
      alert("Avaliação enviada e salva com sucesso!");

      // Redireciona para o Dashboard após 2 segundos
      setTimeout(() => {
        router.push("/dashboard"); // Redireciona para a rota do Dashboard
      }, 2000);
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      setSubmitError("Erro ao enviar avaliação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para calcular a maturidade média
  const calculateMaturity = (responses, questions) => {
    const maturityByCategory = {};

    questions.forEach((q) => {
      if (!maturityByCategory[q.category]) {
        maturityByCategory[q.category] = { total: 0, count: 0 };
      }
      if (responses[q.id]?.politica && responses[q.id]?.pratica) {
        const average =
          (responses[q.id].politica + responses[q.id].pratica) / 2;
        maturityByCategory[q.category].total += average;
        maturityByCategory[q.category].count += 1;
      }
    });

    return Object.keys(maturityByCategory).map((category) => ({
      category,
      average_maturity:
        maturityByCategory[category].count === 0
          ? 0
          : maturityByCategory[category].total / maturityByCategory[category].count,
    }));
  };

  // Função para gerar o relatório executivo
  const generateExecutiveReport = (maturityResults) => {
    const averageMaturity =
      maturityResults.reduce((sum, result) => sum + result.average_maturity, 0) /
      maturityResults.length;

    const lowMaturityCategories = maturityResults.filter(
      (result) => result.average_maturity < 3
    );

    return {
      averageMaturity: averageMaturity.toFixed(2),
      lowMaturityCategories,
      recommendations: [
        "Implementar políticas de privacidade claras e documentadas.",
        "Realizar inventário completo de dados pessoais.",
        "Reforçar controles de acesso e autenticação.",
        "Implementar monitoramento contínuo de segurança.",
        "Desenvolver e testar planos de resposta a incidentes.",
        "Estabelecer um plano de recuperação de desastres robusto.",
      ],
    };
  };

  // Dados das perguntas
  const questions = [
    {
      id: 1,
      category: "Governar",
      question_text: "A empresa possui uma política de privacidade e proteção de dados formalmente documentada?",
    },
    {
      id: 2,
      category: "Identificar",
      question_text: "A empresa identificou todos os tipos de dados pessoais que coleta, processa e armazena?",
    },
    {
      id: 3,
      category: "Proteger",
      question_text: "A empresa implementou controles de acesso para garantir que apenas pessoas autorizadas tenham acesso a dados pessoais?",
    },
    {
      id: 4,
      category: "Detectar",
      question_text: "A empresa possui sistemas de monitoramento contínuo para detectar atividades incomuns ou acessos não autorizados a dados pessoais?",
    },
    {
      id: 5,
      category: "Responder",
      question_text: "A empresa possui um plano de resposta a incidentes de segurança que inclui violações de dados pessoais?",
    },
    {
      id: 6,
      category: "Recuperar",
      question_text: "A empresa possui um plano de recuperação de desastres (DRP) que inclui a recuperação de dados pessoais?",
    },
  ];

  // Agrupa as perguntas por categoria
  const groupedQuestions = questions.reduce((categories, q) => {
    if (!categories[q.category]) categories[q.category] = [];
    categories[q.category].push(q);
    return categories;
  }, {});

  const groupedEntries = Object.entries(groupedQuestions);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Avaliação de Maturidade de Cibersegurança</h1>
      {submitError && <p style={{ color: "red" }}>{submitError}</p>}
      {submitSuccess && <p style={{ color: "green" }}>Avaliação enviada com sucesso!</p>}

      {/* Exibe relatório executivo após o envio com sucesso */}
      {executiveReport && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h2>Relatório Executivo</h2>
          <p><strong>Média de Maturidade:</strong> {executiveReport.averageMaturity}</p>
          <p><strong>Áreas de Baixo Desempenho:</strong></p>
          <ul>
            {executiveReport.lowMaturityCategories.map((category, index) => (
              <li key={index}>{category.category} - Maturidade: {category.average_maturity.toFixed(2)}</li>
            ))}
          </ul>
          <p><strong>Ações Recomendadas:</strong></p>
          <ul>
            {executiveReport.recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Renderiza o questionário */}
      {groupedEntries.map(([category, categoryQuestions]) => (
        <div key={category} style={{ marginBottom: "30px" }}>
          <h2>{category}</h2>
          {categoryQuestions.map((q) => (
            <div key={q.id} style={{ marginBottom: "20px" }}>
              <h3>{q.question_text}</h3>
              <div style={{ marginBottom: "10px" }}>
                <label>Política:</label>
                <select
                  value={responses[q.id]?.politica || ""}
                  onChange={(e) =>
                    handleResponseChange(q.id, "politica", parseInt(e.target.value))
                  }
                  style={{ marginLeft: "10px" }}
                >
                  <option value="">Selecione</option>
                  <option value="1">Inicial</option>
                  <option value="2">Gerenciado</option>
                  <option value="3">Definido</option>
                  <option value="4">Otimizado</option>
                </select>
              </div>
              <div>
                <label>Prática:</label>
                <select
                  value={responses[q.id]?.pratica || ""}
                  onChange={(e) =>
                    handleResponseChange(q.id, "pratica", parseInt(e.target.value))
                  }
                  style={{ marginLeft: "10px" }}
                >
                  <option value="">Selecione</option>
                  <option value="1">Inicial</option>
                  <option value="2">Gerenciado</option>
                  <option value="3">Definido</option>
                  <option value="4">Otimizado</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
      </button>
    </div>
  );
};

export default Assessment;