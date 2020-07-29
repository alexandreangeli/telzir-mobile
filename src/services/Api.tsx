import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://telzir-falemais-backend.herokuapp.com/',
  // baseURL: 'http://10.0.2.2:5000/call_prices/'
});

export function setApiInterceptors(
  setLoadingContextValue: React.Dispatch<React.SetStateAction<boolean>>,
) {
  api.interceptors.request.use(
    (config) => {
      setLoadingContextValue(true);
      return config;
    },
    (error) => {
      // toast.error(error.response?.data || error.message);
      setLoadingContextValue(false);
      return Promise.reject(error);
    },
  );
  api.interceptors.response.use(
    (response) => {
      setLoadingContextValue(false);
      return response;
    },
    (error) => {
      // toast.error(error.response?.data || error.message);
      setLoadingContextValue(false);
      return Promise.reject(error);
    },
  );
}
