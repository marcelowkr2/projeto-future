import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // Verifica se há token

  useEffect(() => {
    if (token) {
      // Só faz a requisição se o usuário estiver autenticado
      api.get("/assessments/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (Array.isArray(response.data)) {
            setData(response.data);
          } else {
            console.error("A resposta da API não é um array.");
          }
        })
        .catch((error) => {
          console.error(
            "Erro ao buscar dados:",
            error.response ? error.response.data : error.message
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false); // Se não houver token, apenas finaliza o carregamento
    }
  }, [token]);

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  return (
    <div>
      <h1>Seja bem-vindo à Cybersecury</h1>
      {token ? (
        data.length === 0 ? (
          <p>Sem dados disponíveis.</p>
        ) : (
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        )
      ) : (
        <p>Para acessar os dados completos, faça login.</p>
      )}
    </div>
  );
}
