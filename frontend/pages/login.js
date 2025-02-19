// frontend/pages/login.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import API from "../services/api";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/api/token/", { username, password });

      // Salva o token no localStorage
      localStorage.setItem("token", response.data.access); // 🔥 Padronizado para "token"

      // Redireciona para o dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Usuário ou senha incorretos.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography variant="body1" color="error" align="center">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Entrar
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;