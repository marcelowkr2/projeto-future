import { useEffect, useState } from "react";
import api from "../services/api";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get("/reports/")
      .then((response) => setReports(response.data))
      .catch((error) => console.error("Erro ao buscar relatórios:", error));
  }, []);

  return (
    <div>
      <h1>Relatórios</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>Relatório de {report.assessment_title}</li>
        ))}
      </ul>
    </div>
  );
}
