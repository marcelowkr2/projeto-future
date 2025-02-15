import useAuth from "../hooks/useAuth";

const ProtectedPage = () => {
  const user = useAuth();

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
