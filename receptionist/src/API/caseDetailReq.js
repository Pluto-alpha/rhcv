import axios from 'axios';
import { BASE_URL } from '../services/common';

const API = axios.create({
  baseURL: BASE_URL, //replace with http://10.130.8.102:8080
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

// Add a request interceptor
API.interceptors.request.use(
  (config) => {
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
    return Promise.reject(error);
  }
);
                    
export const caseDetails = (data) => API.post('/gatepass_api/index.php', data);//replace with end points 'gatepass_api/index.php'

export default API;
