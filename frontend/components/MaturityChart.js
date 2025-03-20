import React from "react";
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

// Registrando os componentes do ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MaturityChart = ({ maturityResults }) => {
  if (!Array.isArray(maturityResults) || maturityResults.length === 0) {
    return <div>Nenhum dado disponível para exibir.</div>;
  }

  const data = {
    labels: maturityResults.map((result) => `Controle ${result.control_id || "N/A"}`),
    datasets: [
      {
        label: "Maturidade Média",
        data: maturityResults.map((result) => result.average_maturity ?? 0),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)", // Cor da borda das barras
        borderWidth: 2, // Deixa as barras mais visíveis
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Evita distorções no tamanho do gráfico
    scales: {
      y: {
        beginAtZero: true, // Garante que o eixo Y comece do zero
        ticks: {
          stepSize: 1, // Define intervalos de 1 unidade no eixo Y
        },
        grid: {
          display: true, // Garante que as linhas do eixo Y apareçam
          color: "rgba(200, 200, 200, 0.5)", // Define uma cor para a grade
        },
      },
      x: {
        grid: {
          display: false, // Oculta a grade do eixo X para evitar poluição visual
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Maturidade dos Controles",
      },
    },
  };

  return <div style={{ height: "400px" }}><Bar data={data} options={options} /></div>;
};

export default MaturityChart;
