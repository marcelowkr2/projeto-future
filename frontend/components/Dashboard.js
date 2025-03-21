// components/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [assessments, setAssessments] = useState([]);
  const [filter, setFilter] = useState("");

  // Busca as avaliações ao carregar o componente
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get("/api/control-assessments/");
        setAssessments(response.data);
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
      }
    };
    fetchAssessments();
  }, []);

  // Filtra as avaliações com base no texto digitado
  const filteredAssessments = assessments.filter((a) =>
    a.question.text.toLowerCase().includes(filter.toLowerCase())
  );

  // Dados para o gráfico
  const data = {
    labels: filteredAssessments.map((a) => a.question.text),
    datasets: [
      {
        label: "Pontuação",
        data: filteredAssessments.map((a) => a.score),
        backgroundColor: "rgba(35, 173, 150, 0.2)",
        borderColor: "rgb(35, 143, 231)",
        borderWidth: 1,
      },
    ],
  };

  // Função para baixar relatório
  const handleDownloadReport = async (assessmentId) => {
    try {
      const response = await axios.get(
        `/api/control-assessments/${assessmentId}/generate-report/`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report_${assessmentId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Erro ao baixar relatório:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard de Avaliações</h1>
      <input
        type="text"
        placeholder="Filtrar por pergunta"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Bar data={data} />
      <div>
        {filteredAssessments.map((assessment) => (
          <div key={assessment.id}>
            <h3>{assessment.question.text}</h3>
            <p>Pontuação: {assessment.score}</p>
            <button onClick={() => handleDownloadReport(assessment.id)}>
              Baixar Relatório
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;