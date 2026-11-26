import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      (error.response?.status === 401 || error.response?.status === 403
        ? 'Sessão expirada ou acesso não autorizado. Faça login novamente.'
        : 'Erro ao comunicar com o servidor.');
    return Promise.reject(new Error(message));
  }
);

export default api;