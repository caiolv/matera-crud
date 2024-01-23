export interface IMainState {
  user: IUserState;
}

export interface IUserState {
  info: IUser | null;
  isLoggedIn: boolean;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  cpf: string;
  cep: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  birthDate: string;
  phone: string;
}

export type UserAction = {
  user: IUser | null;
  isLoggedIn: boolean;
};

export type ISignInForm = {
  email: string;
  password: string;
};
