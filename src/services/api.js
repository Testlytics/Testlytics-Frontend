import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
    login: async (credentials) => {
      const response = await api.post('/auth/login', credentials);
      return {
        token: response.data.token,
        user: {
          // Map backend response to frontend expected format
          email: response.data.sub, // Using 'sub' from JWT as email
          role: response.data.role.toLowerCase() // Convert 'ADMIN' to 'admin'
        }
      }}}
  
export const testService = {
  getTestsByVariant: async (variant) => {
   const response = await api.get(`/tests?variant=${variant}`);
    return response.data;
  },
};


export default api;