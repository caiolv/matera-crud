import { IProduct, IProductForm } from '@/types/store.type';

import { api } from './api';

const path = '/produto';

export const getProducts = async () => {
  const response = await api.get<IProduct[]>(path);

  response.data.map((product) => {
    // eslint-disable-next-line no-param-reassign
    product.preco = Number(product.preco);
    return product;
  });

  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await api.get<IProduct>(`${path}/${id}`);
  return response.data;
};

export const addProduct = async (product: IProductForm) => {
  const response = await api.post(path, product);
  return response.data[0];
};

export const editProduct = async (product: IProductForm, productId: string) => {
  const response = await api.put(`${path}/${productId}`, product);
  return response;
};

export const deleteProduct = async (productId: string) => {
  const response = await api.delete(`${path}/${productId}`);
  return response;
};
