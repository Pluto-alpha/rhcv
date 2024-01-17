import axios from 'axios';

const API = axios.create({
  baseURL: 'http://10.130.8.102:8080', //replace with http://10.130.8.102:8080
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [function (data, headers) {
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      const formData = new URLSearchParams();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      return formData.toString();
    }
    return data;
  }],
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
                    //replace with end points 'gatepass_api/index.php'
export const caseDetails = (data) => API.post('/gatepass_api/index.php', data);

export default API;
