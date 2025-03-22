// Função para obter o token JWT do localStorage ou outro lugar onde ele está armazenado
export const getAuthToken = () => {
  const token = localStorage.getItem("authToken"); // Ou onde quer que o token esteja armazenado
  console.log("Token JWT:", token); // Verifique o token no console
  return token; // Retorna o token encontrado
};
