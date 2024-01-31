import axios from 'axios';
import { BASE_URL } from '../services/common';

const API = axios.create({
  baseURL: BASE_URL,
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
export const getSingleUser = (id) => API.get(`/api/v1/auth/user/${id}`);
export const receptionDashbord = (data) => API.get('/api/v1/auth/reception-dashboard', data);

export default API;
