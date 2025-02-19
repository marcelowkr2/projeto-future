import { useEffect, useState } from "react";
import api from "../services/api";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .get("/users/") // Ajuste conforme sua API
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username} - {user.user_type}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
