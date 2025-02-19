import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "../services/api";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Dashboard from "../components/Dashboard";

const Reports = () => {
  const [executiveReport, setExecutiveReport] = useState(null);
  const [operationalReport, setOperationalReport] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use effect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseExecutive = await API.get('/executive-report');
        const responseOperational = await API.get('/operational-report');
        setExecutiveReport(responseExecutive.data);
        setOperationalReport(responseOperational.data);
      } catch (error) {
        console.error("Erro ao carregar os relatórios:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando relatórios...</div>;
  }

  // Se não houver executiveReport, renderize uma mensagem de erro
  if (!executiveReport) {
    return <div>Erro: Relatório executivo não encontrado.</div>;
  }

  // Se não houver operationalReport, renderize uma mensagem de erro
  if (!operationalReport) {
    return <div>Erro: Relatório operacional não encontrado.</div>;
  }

  return (
    <div>
      <h1>Relatório Executivo</h1>
      {executiveReport.averageMaturity ? (
        <p>Maturidade Média: {executiveReport.averageMaturity}</p>
      ) : (
        <p>Maturidade Média não disponível</p>
      )}
      <h2>Controles com Baixa Maturidade</h2>
      <ul>
        {executiveReport.lowMaturityControls?.map((control) => (
          <li key={control.control_id}>
            Controle {control.control_id}: Maturidade {control.average_maturity.toFixed(2)}
          </li>
        ))}
      </ul>
      <h2>Recomendações</h2>
      <ul>
        {executiveReport.recommendations?.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>

      <h1>Relatório Operacional</h1>
      {operationalReport?.map((control) => (
        <div key={control.control_id}>
          <h2>Controle {control.control_id}</h2>
          <p>Maturidade Média: {control.average_maturity.toFixed(2)}</p>
          <h3>Questões</h3>
          <ul>
            {control.questions?.map((q) => (
              <li key={q.id}>
                <strong>{q.question_text}</strong>: {q.response}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Reports;
