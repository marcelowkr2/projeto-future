import React from "react";

const Question = ({ question, response, handleResponseChange }) => {
  const { id, text, category } = question;

  // Função para lidar com a mudança na seleção da resposta
  const handleSelectChange = (e) => {
    const level = parseInt(e.target.value, 10); // Certifique-se de que o valor seja numérico
    handleResponseChange(id, "politica", level); // Chama a função de mudança com o ID da questão
  };

  return (
    <div className="question-container">
      <h3>{text}</h3>
      <p><strong>Categoria:</strong> {category}</p>
      <select
        value={response?.politica || ""} // Define o valor da seleção baseado na resposta atual
        onChange={handleSelectChange}
      >
        <option value="">Selecione</option>
        <option value="1">Inicial</option>
        <option value="2">Gerenciado</option>
        <option value="3">Definido</option>
        <option value="4">Otimizado</option>
      </select>
    </div>
  );
};

export default Question;
