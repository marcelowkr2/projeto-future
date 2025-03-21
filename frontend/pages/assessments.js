import React, { useState, useEffect } from "react";
import API from "../services/api";
import Question from "../components/Question"; // Componente de pergunta
import { getAuthToken } from "../utils/auth"; // Função para obter o token de autenticação

const Assessment = () => {
  const [questions, setQuestions] = useState([]); // Armazena as perguntas
  const [responses, setResponses] = useState({}); // Armazena as respostas do usuário
  const [loading, setLoading] = useState(true); // Estado para exibição de carregamento
  const [error, setError] = useState(null); // Estado para exibição de erros

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = getAuthToken(); // Obtém o token do localStorage ou similar
        const response = await API.get("api/assessments/", {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
        });

        console.log("Resposta da API:", response.data);

        // Verifica se a resposta é uma lista de objetos e formata as perguntas
        if (Array.isArray(response.data)) {
          const formattedQuestions = response.data.map((q, index) => ({
            id: index + 1, // Gera um ID com base no índice
            category: q.category,
            text: q.text,
          }));
          setQuestions(formattedQuestions);
        } else {
          throw new Error("Formato inesperado de resposta da API");
        }
      } catch (error) {
        console.error("Erro ao buscar questões:", error);
        setError("Erro ao carregar as questões. Verifique a API ou tente novamente mais tarde.");
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchQuestions();
  }, []);

  const handleResponseChange = (questionId, type, level) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: {
        ...prevResponses[questionId],
        [type]: level,
      },
    }));
  };

  if (loading) {
    return <p>Carregando questões...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Avaliação de Maturidade</h1>
      {questions.length > 0 ? (
        questions.map((q) => (
          <Question
            key={q.id}
            question={q}
            response={responses[q.id]}
            handleResponseChange={handleResponseChange}
          />
        ))
      ) : (
        <p>Nenhuma questão disponível no momento.</p>
      )}
    </div>
  );
};

export default Assessment;