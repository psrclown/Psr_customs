/**
 * API Utility - Axios instance for backend requests
 */

import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      // Redirect to admin login if on protected route
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  getMe: () => api.get('/api/auth/me'),
};

// Bookings API
export const bookingsAPI = {
  getAll: () => api.get('/api/bookings'),
  getOne: (id) => api.get(`/api/bookings/${id}`),
  create: (data) => api.post('/api/bookings', data),
  update: (id, data) => api.put(`/api/bookings/${id}`, data),
  delete: (id) => api.delete(`/api/bookings/${id}`),
};

// Services API
export const servicesAPI = {
  getAll: () => api.get('/api/services'),
  getOne: (id) => api.get(`/api/services/${id}`),
};

// Contact messages API (admin)
export const messagesAPI = {
  getAll: () => api.get('/api/admin/dashboard/messages'),
};

export default api;
