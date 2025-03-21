import React from "react";

const Question = ({ question, response, handleResponseChange }) => {
  const { id, text, category } = question;

  const handleSelectChange = (e) => {
    const level = parseInt(e.target.value);
    handleResponseChange(id, "politica", level);
  };

  return (
    <div className="question-container">
      <h3>{text}</h3>
      <p><strong>Categoria:</strong> {category}</p>
      <select
        value={response?.politica || ""}
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
