import axios from 'axios';


const API = axios.create({
  baseURL: 'http://localhost:5001',
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
      //token expiration
    }
    return Promise.reject(error);
  }
);

export const login = (data) => API.post('/api/v1/auth/login', data);
export const register = (data) => API.post('/api/v1/auth/register', data);
export const getAllUsers = (data) => API.get('/api/v1/auth/user', data);

export default API;
