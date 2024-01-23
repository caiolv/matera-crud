import { ISignUpForm, IUser } from '@/types/store.type';
import { AxiosResponse } from 'axios';

import { api } from './api';

const path = '/user';

export const getUser = async (email: string) => {
  const response: AxiosResponse<IUser[]> = await api.get(path, {
    params: { search: email },
  });

  return response.data[0];
};

export const createUser = async (user: ISignUpForm) => {
  const response: AxiosResponse<IUser> = await api.post(path, user);

  return response.data;
};
