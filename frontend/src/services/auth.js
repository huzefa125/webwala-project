import apiClient from './api';

export const authService = {
  register: (name, email, password) => {
    return apiClient.post('/auth/register', { name, email, password });
  },

  login: (email, password) => {
    return apiClient.post('/auth/login', { email, password });
  },

  getCurrentUser: () => {
    return apiClient.get('/auth/me');
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const taskService = {
  addTask: (title) => {
    return apiClient.post('/tasks', { title });
  },

  getAllTasks: (filter = null) => {
    const params = filter ? { filter } : {};
    return apiClient.get('/tasks', { params });
  },

  updateTask: (taskId, updates) => {
    return apiClient.put(`/tasks/${taskId}`, updates);
  },

  deleteTask: (taskId) => {
    return apiClient.delete(`/tasks/${taskId}`);
  },
};
