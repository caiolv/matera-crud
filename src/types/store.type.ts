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

export interface ISignInForm {
  email: string;
  password: string;
}
enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'non_binary',
}

interface IAddress {
  zipCode: string;
  city: string;
  state: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
}

export interface ISignUpForm {
  name: string;
  surname: string;
  cpf: string;
  email: string;
  password: string;
  gender: Gender;
  birthDate: Date | string | number;
  address: IAddress;
}
