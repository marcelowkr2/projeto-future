// components/QuestionnaireForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const QuestionnaireForm = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/api/questions/");
        setQuestions(response.data);
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/control-assessments/", {
        user: 1, // Substitua pelo ID do usuário logado
        question: 1, // Substitua pelo ID da pergunta
        policy_maturity: responses.policy,
        practice_maturity: responses.practice,
      });
      alert("Respostas enviadas com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar respostas:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question) => (
        <div key={question.id}>
          <h3>{question.text}</h3>
          <label>
            Maturidade da Política:
            <input
              type="number"
              min="1"
              max="5"
              value={responses[question.id]?.policy || ""}
              onChange={(e) =>
                setResponses({
                  ...responses,
                  [question.id]: { ...responses[question.id], policy: e.target.value },
                })
              }
            />
          </label>
          <label>
            Maturidade da Prática:
            <input
              type="number"
              min="1"
              max="5"
              value={responses[question.id]?.practice || ""}
              onChange={(e) =>
                setResponses({
                  ...responses,
                  [question.id]: { ...responses[question.id], practice: e.target.value },
                })
              }
            />
          </label>
        </div>
      ))}
      <button type="submit">Enviar</button>
    </form>
  );
};

export default QuestionnaireForm;