import { cepApi } from './api';

export const getAddress = async (cep: string) => {
  const response = await cepApi.get(`/${cep}/json`);
  return response.data;
};
