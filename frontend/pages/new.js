import React, { useState } from "react";
import API from "../services/api";
import { useRouter } from "next/router";

const NewQuestionPage = () => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("Fácil");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !category) {
      setMessage({ type: "error", text: "Todos os campos são obrigatórios!" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await API.post("/questions/", { text, category, difficulty });
      setMessage({ type: "success", text: "Pergunta adicionada com sucesso!" });

      // Redireciona automaticamente para a avaliação após adicionar a pergunta
      setTimeout(() => router.push("/assessments"), 1500);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Erro ao adicionar pergunta.",
      });
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
    },
    error: {
      color: "red",
    },
    success: {
      color: "green",
    },
  };
  

  return (
    <div style={styles.container}>
      <h1>Nova Pergunta</h1>

      {message && <p style={message.type === "error" ? styles.error : styles.success}>{message.text}</p>}

      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>Texto da Pergunta:</label>
        <input style={styles.input} type="text" value={text} onChange={(e) => setText(e.target.value)} />

        <label style={styles.label}>Categoria:</label>
        <input style={styles.input} type="text" value={category} onChange={(e) => setCategory(e.target.value)} />

        <label style={styles.label}>Dificuldade:</label>
        <select style={styles.input} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="Fácil">Fácil</option>
          <option value="Médio">Médio</option>
          <option value="Difícil">Difícil</option>
        </select>

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Adicionar Pergunta"}
        </button>
      </form>

      <button style={styles.backButton} onClick={() => router.push("/assessments")}>
        Voltar para Avaliação
      </button>
    </div>
  );
};

export default NewQuestionPage;
