import api from './api';

export const login = async (username, password) => {
  const response = await api.post('/token/', { username, password });
  if (response.data.access) {
    localStorage.setItem('token', response.data.access);
    return response.data;
  }
  throw new Error('Falha na autenticação');
};

export const logout = () => {
  localStorage.removeItem('token');
};
