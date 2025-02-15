// frontend/pages/questions/index.js
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/router";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await API.get("/questions/");
        setQuestions(response.data);
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>Perguntas</h1>
      <button onClick={() => router.push("/questions/new")}>Adicionar Pergunta</button>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {question.text} - {question.category}
            <button onClick={() => router.push(`/questions/${question.id}`)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsPage;