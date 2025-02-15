// components/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [assessments, setAssessments] = useState([]);

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

  const data = {
    labels: assessments.map((a) => a.question.text),
    datasets: [
      {
        label: "Pontuação",
        data: assessments.map((a) => a.score),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard de Avaliações</h2>
      <Bar data={data} />
    </div>
  );
};

// components/Dashboard.js
const handleDownloadReport = async (assessmentId) => {
    try {
      const response = await axios.get(`/api/control-assessments/${assessmentId}/generate-report/`, {
        responseType: "blob",
      });
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

 
const [filter, setFilter] = useState("");

const filteredAssessments = assessments.filter((a) =>
  a.question.text.toLowerCase().includes(filter.toLowerCase())
);

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
  </div>
);



export default Dashboard;