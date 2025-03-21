import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from "../services/api";
import Question from "../components/Question";  // Novo componente

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
        <Question
          key={q.id}
          question={q}
          response={responses[q.id]}
          handleResponseChange={handleResponseChange}
        />
      ))}
    </div>
  );
};

export default Assessment;
