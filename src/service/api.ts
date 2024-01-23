import axios from 'axios';

const apiUrl = process.env.REACT_APP_API;

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
