import { store } from '@/store';
import { setLoggedOut } from '@/store/actions/user';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API;
const cepUrl = process.env.REACT_APP_CEP_API;

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const cepApi = axios.create({
  baseURL: cepUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = api.defaults.headers.common.Authorization;
  // eslint-disable-next-line no-debugger
  debugger;

  if (!token) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ response: { status: 401 } });
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(setLoggedOut());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
