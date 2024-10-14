import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include token in headers if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tokens');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;