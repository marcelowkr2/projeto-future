import { useEffect, useState } from "react";
import api from "../services/api";

export default function Assessments() {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    api.get("/assessments/")
      .then((response) => setAssessments(response.data))
      .catch((error) => console.error("Erro ao buscar avaliações:", error));
  }, []);

  return (
    <div>
      <h1>Avaliações</h1>
      <ul>
        {assessments.map((assessment) => (
          <li key={assessment.id}>{assessment.title}</li>
        ))}
      </ul>
    </div>
  );
}
