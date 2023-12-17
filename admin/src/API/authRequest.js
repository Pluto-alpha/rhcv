import axios from 'axios';


const API = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    const res = await API.get('/api/v1/auth/refresh-token');
    const token = res.data.token;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
};
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
      try {
        refreshToken();
        return API.request(error.config);
      } catch (refreshError) {
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const login = (data) => API.post('/api/v1/auth/login', data);
export const register = (data) => API.post('/api/v1/auth/register', data);
export const getAllUsers = (data) => API.get('/api/v1/auth/user', data);

export default API;
