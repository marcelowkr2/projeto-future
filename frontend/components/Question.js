// components/Question.js
import React from "react";
import styles from "../styles/Question.module.css";

const Question = ({ question, response, handleResponseChange }) => {
  const { id, text, category } = question;

  const handleSelectChange = (e) => {
    handleResponseChange(id, e.target.value);
  };

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionHeader}>
        <span className={styles.questionCategory}>{category}</span>
        <h3 className={styles.questionText}>{text}</h3>
      </div>
      
      <div className={styles.responseOptions}>
        <select
          value={response || ""}
          onChange={handleSelectChange}
          className={styles.responseSelect}
        >
          <option value="">Selecione o nível de maturidade</option>
          <option value="1">1 - Inicial (Ad-hoc)</option>
          <option value="2">2 - Gerenciado (Reativo)</option>
          <option value="3">3 - Definido (Proativo)</option>
          <option value="4">4 - Otimizado (Melhorado Continuamente)</option>
        </select>
      </div>
    </div>
  );
};

export default Question;