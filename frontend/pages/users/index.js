import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/router";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get("/users/");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Usuários</h1>
      <button onClick={() => router.push("/users/new")}>Adicionar Usuário</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email}
            <button onClick={() => router.push(`/users/${user.id}`)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;