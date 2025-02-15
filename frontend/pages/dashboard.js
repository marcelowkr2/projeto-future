// frontend/pages/dashboard.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../components/Dashboard";
import API from "../services/api";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [assessments, setAssessments] = useState([]);
  const router = useRouter();

  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await API.get("/control-assessments/");
        setAssessments(response.data);
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
        router.push("/login");
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
      <h1>Dashboard de Avaliações</h1>
      <Bar data={data} />
    </div>
  );
};

export default Dashboard;