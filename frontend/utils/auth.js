export const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token"); // Recupera o token JWT do localStorage
    }
    return null;
  };
  