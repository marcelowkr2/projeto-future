import { useAuth } from "../hooks/useAuth"; // Certifique-se de que o caminho está correto

const ProtectedPage = () => {
  const { user } = useAuth(); // Agora você deve desestruturar do contexto

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h2>Página Protegida</h2>
      <p>Bem-vindo, {user.username}!</p>
    </div>
  );
};

export default ProtectedPage;
