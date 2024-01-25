import axios from 'axios';


const API = axios.create({
  baseURL: 'https://192.168.1.6:5001',
  withCredentials: true,
});

// Add a request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear('token');
      localStorage.clear('user');
      window.location.href = '/'
    }
    return Promise.reject(error);
  }
);

export const login = (data) => API.post('/api/v1/auth/login', data);
export const register = (data) => API.post('/api/v1/auth/register', data);
export const getAllUsers = (data) => API.get('/api/v1/auth/user', data);
export const updateUser = (id, data) => API.put(`/api/v1/auth/user/${id}`, data);
export const getDashboard = (data) => API.get('/api/v1/auth/dashboard', data);

export default API;
