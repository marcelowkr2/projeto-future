import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../services/api";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/user/"); // Ajuste com seu endpoint de usuário autenticado
        setUser(response.data);
      } catch (err) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  return user;
};

export default useAuth;
