import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true,
});

// Add a request interceptor
API.interceptors.request.use(
  (config) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // Add the token to the request headers
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
    // Do something with the response data
    return response;
  },
  (error) => {
    // Handle errors, e.g., redirect to login page if authentication fails
    if (error.response.status === 401) {
      // Handle unauthorized access
      // Redirect to login page or show an error message
    }
    return Promise.reject(error);
  }
);

export const addVisitor = (data) => API.post('/api/v1/visitor', data);
export const GetAllvisitor = (data) => API.get('/api/v1/visitor', data);
export const createPass = (id) => API.get(`/api/v1/visitor/generate-pass/${id}`);


export default API;
