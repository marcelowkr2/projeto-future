import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // URL do backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Adiciona o token CSRF automaticamente
API.interceptors.request.use((config) => {
  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];

  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }

  return config;
});

export default API;