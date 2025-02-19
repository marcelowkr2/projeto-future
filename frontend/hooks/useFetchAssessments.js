// frontend/hooks/useFetchAssessments.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "../services/api";

const useFetchAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await API.get("/control-assessments/");
        setAssessments(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
        setError("Falha ao carregar dados.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  return { assessments, loading, error };
};

export default useFetchAssessments;
