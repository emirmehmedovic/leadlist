import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },
  
  me: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  verify: async () => {
    const response = await api.post('/auth/verify');
    return response.data;
  },
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
  
  create: async (data: { name: string; description?: string; color?: string }) => {
    const response = await api.post('/categories', data);
    return response.data;
  },
  
  update: async (id: string, data: { name?: string; description?: string; color?: string }) => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};

// Leads API
export const leadsAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    status?: string;
    priority?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    const response = await api.get('/leads', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  },
  
  create: async (data: {
    title: string;
    description?: string;
    email?: string;
    phone?: string;
    company?: string;
    status?: string;
    priority?: string;
    value?: number;
    notes?: string;
    actions?: string;
    categoryId: string;
  }) => {
    const response = await api.post('/leads', data);
    return response.data;
  },
  
  update: async (id: string, data: {
    title?: string;
    description?: string;
    email?: string;
    phone?: string;
    company?: string;
    status?: string;
    priority?: string;
    value?: number;
    notes?: string;
    actions?: string;
    categoryId?: string;
  }) => {
    const response = await api.put(`/leads/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get('/leads/stats/overview');
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  
  updateProfile: (data: { name?: string; email?: string }) =>
    api.put('/users/profile', data),
  
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put('/users/change-password', data),
  
  deleteAccount: () => api.delete('/users/account'),
  
  getAll: (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }) => api.get('/users', { params }),
}; 