import { useState, useEffect, createContext, useContext } from "react";
import API from "../services/api";
import { useRouter } from "next/router";

// Cria o contexto de autenticação
const AuthContext = createContext();

// Provedor de autenticação que envolve a aplicação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      API.defaults.headers.Authorization = `Bearer ${token}`;

      API.get("/auth/user/")
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          logout();
        });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await API.post("/auth/login/", { email, password });
      localStorage.setItem("token", response.data.token);
      API.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      setUser(response.data.user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Credenciais inválidas!");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    API.defaults.headers.Authorization = null;
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext); // Certifique-se de que está retornando o contexto
};
