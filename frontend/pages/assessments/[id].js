// frontend/pages/assessments/[id].js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "../../services/api";

const AssessmentDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [assessment, setAssessment] = useState(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await API.get(`/control-assessments/${id}/`);
        setAssessment(response.data);
      } catch (error) {
        console.error("Erro ao buscar avaliação:", error);
      }
    };
    if (id) fetchAssessment();
  }, [id]);

  if (!assessment) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Detalhes da Avaliação</h1>
      <p>Pergunta: {assessment.question.text}</p>
      <p>Pontuação: {assessment.score}</p>
    </div>
  );
};

export default AssessmentDetail;