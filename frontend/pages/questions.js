// frontend/pages/questions/index.js
import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useRouter } from "next/router";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await API.get("/questions/");
        setQuestions(response.data);
      } catch (error) {
        setError("Erro ao buscar perguntas. Tente novamente.");
        console.error("Erro ao buscar perguntas:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Perguntas</h1>

      {/* Botão de Adicionar Pergunta */}
      <button style={styles.addButton} onClick={() => router.push("/new/")}>
        + Adicionar Pergunta
      </button>

      {/* Feedback de erro */}
      {error && <p style={styles.error}>{error}</p>}

      {/* Feedback de carregamento */}
      {loading ? (
        <p>Carregando perguntas...</p>
      ) : questions.length === 0 ? (
        <p>Nenhuma pergunta cadastrada.</p>
      ) : (
        <ul style={styles.list}>
          {questions.map((question) => (
            <li key={question.id} style={styles.listItem}>
              <strong>{question.text}</strong> - <em>{question.category}</em>
              <button style={styles.editButton} onClick={() => router.push(`/questions/${question.id}`)}>
                ✏️ Editar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Estilos inline
const styles = {
  container: { padding: "20px", maxWidth: "600px", margin: "auto" },
  addButton: {
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    marginBottom: "15px",
  },
  list: { listStyle: "none", padding: 0 },
  listItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #ddd" },
  editButton: { backgroundColor: "#ff9800", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" },
  error: { color: "red", fontWeight: "bold" },
};

export default QuestionsPage;
