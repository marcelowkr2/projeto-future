import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from "../services/api";

const Assessment = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Buscar as perguntas do backend
    const fetchQuestions = async () => {
      try {
        const response = await API.get("/assessments/api/questions/");
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Erro ao buscar questões:", error);
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

  return (
    <div>
      <h1>Avaliação de Maturidade</h1>
      {questions.map((q) => (
        <div key={q.id}>
          <h3>{q.question_text}</h3>
          <select
            value={responses[q.id]?.politica || ""}
            onChange={(e) => handleResponseChange(q.id, "politica", parseInt(e.target.value))}
          >
            <option value="">Selecione</option>
            <option value="1">Inicial</option>
            <option value="2">Gerenciado</option>
            <option value="3">Definido</option>
            <option value="4">Otimizado</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Assessment;
