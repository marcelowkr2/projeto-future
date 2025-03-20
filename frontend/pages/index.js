import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); // Gerencie o token no estado

  useEffect(() => {
    // Garante que o código só será executado no cliente
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token"); // Obtém o token do localStorage
      setToken(storedToken);

      if (storedToken) {
        // Só faz a requisição se o usuário estiver autenticado
        api.get("/assessments/", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
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
        setLoading(false); // Finaliza o carregamento se não houver token
      }
    }
  }, []);

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  return (
    <div>
      <h1>Seja bem-vindo à Cybersecurity</h1>
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
