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
      localStorage.clear('token');
      localStorage.clear('user');
      window.location.href = '/'
    }
    return Promise.reject(error);
  }
);

export const addVisitor = (data) => API.post('/api/v1/visitor', data);
export const GetVisitorDetails = () => API.get('/api/v1/visitor/');
export const GetSingleVisitor = (id) => API.get(`/api/v1/visitor/${id}`);
export const UpdateVisitor = (id, data) => API.put(`/api/v1/visitor/${id}`, data);
export const createPass = (id) => API.get(`/api/v1/visitor/generate-pass/${id}`);
export const UpdateImageVisitor = (id, data) => API.post(`/api/v1/visitor/${id}`, data);


export default API;
