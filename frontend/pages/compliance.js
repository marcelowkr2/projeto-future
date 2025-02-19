import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "../services/api";
import ComplianceChart from "../components/charts/ComplianceChart";


const Compliance = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [complianceData, setComplianceData] = useState(null);

  // Função para buscar os dados de conformidade
  useEffect(() => {
    const fetchComplianceData = async () => {
      try {
        // Supondo que a URL seja a mesma definida no Django
        const response = await API.get("/get-maturity-results/");
        setComplianceData(response.data); // Aqui você recebe os dados de conformidade
      } catch (error) {
        console.error("Erro ao buscar dados de conformidade:", error);
      }
    };

    // Chama a função para buscar dados de conformidade
    fetchComplianceData();
  }, []);

  // Validação do token
  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      console.warn("Token ausente. Redirecionando para login...");
      router.push("/login");
      return;
    }

    const validateToken = async () => {
      try {
        await API.get("http://localhost:8000/auth/validate-token/", { // Defina a URL completa
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token inválido ou expirado:", error);
        localStorage.removeItem("auth_token");
        router.push("/login");
      }
    };

    validateToken();
  }, [router]); // Dependência para evitar problemas

  // Se não estiver autenticado, mostra a mensagem "Carregando..."
  if (!isAuthenticated) return <p>Carregando...</p>;

  return (
    <div>
      {complianceData ? (
        <div>
          <h1>Status de Conformidade</h1>
          {/* Aqui vamos gerar o gráfico */}
          <ComplianceChart data={complianceData} />
        </div>
      ) : (
        <p>Carregando dados de conformidade...</p>
      )}
    </div>
  );
};

export default Compliance;
