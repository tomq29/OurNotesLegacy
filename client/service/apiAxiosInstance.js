import axios from 'axios';

const apiAxiosInstance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

let accessToken;

export function setAccessToken(token) {
  accessToken = token;
}

apiAxiosInstance.interceptors.request.use(
  (congig) => {
    if (!congig.headers.Authorization) {
      congig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return congig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error.response.status === 403 && !prevRequest.sent) {
      const response = await axios.get('/api/tokens/refresh');
      accessToken = response.data.accessToken;
      prevRequest.sent = true;
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiAxiosInstance(prevRequest);
    }
    return Promise.reject(error);
  }
);

export default apiAxiosInstance;
