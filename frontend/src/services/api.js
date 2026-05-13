import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// ── Request Interceptor ───────────────────────────────────────────────────────
// Automatically attaches the JWT from localStorage to every outgoing request.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kazi_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ──────────────────────────────────────────────────────
// Handles global error cases:
//   401 → token expired / invalid → clear storage and redirect to /login
//   403 → forbidden (logged but no permission)
//   Network errors → surface a friendly message
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('kazi_token');
        localStorage.removeItem('kazi_user');
        // Only redirect if we are not already on the login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    } else if (error.request) {
      // Request was made but no response received (network down / CORS)
      error.message = 'Unable to reach the server. Please check your connection.';
    }
    return Promise.reject(error);
  }
);

export default api;
