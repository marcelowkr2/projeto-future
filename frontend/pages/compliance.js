import { useEffect, useState } from "react";
import api from "../services/api";

export default function Compliance() {
  const [standards, setStandards] = useState([]);

  useEffect(() => {
    api.get("/compliance/")
      .then((response) => setStandards(response.data))
      .catch((error) => console.error("Erro ao buscar normas de conformidade:", error));
  }, []);

  return (
    <div>
      <h1>Normas de Conformidade</h1>
      <ul>
        {standards.map((standard) => (
          <li key={standard.id}>{standard.name}</li>
        ))}
      </ul>
    </div>
  );
}
