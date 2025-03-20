import React, { useState, useCallback } from "react";
import { useRouter } from "next/router"; // Usando o roteamento do Next.js
import API from "../services/api";

const Assessment = () => {
  const [responses, setResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [executiveReport, setExecutiveReport] = useState(null);
  const router = useRouter(); // Hook do Next.js para redirecionamento

  const handleResponseChange = useCallback((questionId, level) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: level,
    }));
  }, []);

  const handleSubmit = async () => {
    // Verificar se todas as perguntas foram respondidas
    const unansweredQuestions = questions.filter((q) => !responses[q.id]);
    if (unansweredQuestions.length > 0) {
      alert(`Por favor, responda todas as questões.`);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);
    setExecutiveReport(null); // Resetando o relatório antes de gerar novo

    try {
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

      // Envia o relatório executivo para o backend (ou estado global)
      await API.post("/assessments/api/save-assessments/", report);

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

  const calculateMaturity = (responses, questions) => {
    const maturityByControl = {};

    questions.forEach((q) => {
      if (!maturityByControl[q.control_id]) {
        maturityByControl[q.control_id] = { total: 0, count: 0 };
      }
      if (responses[q.id]) {
        maturityByControl[q.control_id].total += responses[q.id];
        maturityByControl[q.control_id].count += 1;
      }
    });

    return Object.keys(maturityByControl).map((controlId) => ({
      control_id: controlId,
      average_maturity:
        maturityByControl[controlId].count === 0
          ? 0
          : maturityByControl[controlId].total / maturityByControl[controlId].count,
    }));
  };

  const generateExecutiveReport = (maturityResults) => {
    const averageMaturity =
      maturityResults.reduce((sum, result) => sum + result.average_maturity, 0) /
      maturityResults.length;

    const lowMaturityControls = maturityResults.filter(
      (result) => result.average_maturity < 3
    );

    return {
      averageMaturity: averageMaturity.toFixed(2),
      lowMaturityControls,
      recommendations: [
        "Implementar automação para inventário de ativos.",
        "Melhorar o controle de acesso físico e lógico.",
        "Integrar inteligência artificial para detecção de anomalias.",
        "Revisar políticas de segurança periodicamente.",
      ],
    };
  };

  // Dados das perguntas
  const questions = [
    {
      id: 1,
      control_id: 1,
      category: "Governança",
      question_text: "A empresa mantém um inventário atualizado de todos os ativos de hardware?",
      maturity_levels: {
        1: "Não há inventário.",
        2: "Inventário parcialmente atualizado.",
        3: "Inventário atualizado, mas sem automação.",
        4: "Inventário atualizado e automatizado.",
        5: "Inventário atualizado, automatizado e integrado a ferramentas de segurança.",
      },
    },
    {
      id: 2,
      control_id: 2,
      category: "Segurança de Acesso",
      question_text: "A empresa adota autenticação multifator para acessos sensíveis?",
      maturity_levels: {
        1: "Não há autenticação multifator.",
        2: "Autenticação multifator implementada em poucos sistemas.",
        3: "Autenticação multifator implementada na maioria dos sistemas.",
        4: "Autenticação multifator obrigatória para todos os acessos sensíveis.",
        5: "Autenticação multifator integrada com mecanismos de inteligência artificial para detecção de anomalias.",
      },
    },
    {
      id: 3,
      control_id: 3,
      category: "Proteção",
      question_text: "A empresa realiza criptografia de dados sensíveis em repouso e em trânsito?",
      maturity_levels: {
        1: "Não há criptografia.",
        2: "Criptografia parcial implementada em alguns dados.",
        3: "Criptografia de dados em repouso implementada.",
        4: "Criptografia de dados em repouso e em trânsito implementada.",
        5: "Criptografia automatizada e monitorada para todos os dados sensíveis.",
      },
    },
    {
      id: 4,
      control_id: 4,
      category: "Detecção",
      question_text: "A empresa possui um sistema de monitoramento contínuo para detectar intrusões?",
      maturity_levels: {
        1: "Não há sistema de monitoramento.",
        2: "Monitoramento implementado, mas não contínuo.",
        3: "Monitoramento contínuo com ferramentas básicas.",
        4: "Monitoramento contínuo com ferramentas avançadas de detecção.",
        5: "Monitoramento contínuo com IA para detecção preditiva e automatizada de intrusões.",
      },
    },
    {
      id: 5,
      control_id: 5,
      category: "Resposta",
      question_text: "A empresa possui um plano de resposta a incidentes documentado e testado?",
      maturity_levels: {
        1: "Não há plano de resposta.",
        2: "Plano de resposta implementado, mas não testado.",
        3: "Plano de resposta testado e documentado.",
        4: "Plano de resposta testado regularmente com simulações.",
        5: "Plano de resposta com melhorias contínuas baseado em simulações realistas.",
      },
    },
    {
      id: 6,
      control_id: 6,
      category: "Recuperação",
      question_text: "A empresa possui um plano de recuperação de desastres testado e documentado?",
      maturity_levels: {
        1: "Não há plano de recuperação.",
        2: "Plano de recuperação implementado, mas não testado.",
        3: "Plano de recuperação testado e documentado.",
        4: "Plano de recuperação testado regularmente com melhorias contínuas.",
        5: "Plano de recuperação com melhorias baseadas em análise pós-incidente.",
      },
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
    <div>
      <h1>Avaliação de Maturidade de Cibersegurança</h1>
      {submitError && <p style={{ color: "red" }}>{submitError}</p>}
      {submitSuccess && <p style={{ color: "green" }}>Avaliação enviada com sucesso!</p>}

      {/* Exibe relatório executivo após o envio com sucesso */}
      {executiveReport && (
        <div>
          <h2>Relatório Executivo</h2>
          <p><strong>Média de Maturidade:</strong> {executiveReport.averageMaturity}</p>
          <p><strong>Áreas de Baixo Desempenho:</strong></p>
          <ul>
            {executiveReport.lowMaturityControls.map((control, index) => (
              <li key={index}>Controle {control.control_id} - Maturidade: {control.average_maturity}</li>
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
        <div key={category}>
          <h2>{category}</h2>
          {categoryQuestions.map((q) => (
            <div key={q.id}>
              <h3>{q.question_text}</h3>
              {[1, 2, 3, 4, 5].map((level) => (
                <div key={level}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={level}
                      onChange={() => handleResponseChange(q.id, level)}
                      checked={responses[q.id] === level}
                    />
                    {q.maturity_levels[level]}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
      </button>
    </div>
  );
};

export default Assessment;