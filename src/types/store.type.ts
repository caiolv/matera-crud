export interface IMainState {
  user: IUserState;
}

export interface IUserState {
  info: IUser | null;
  isLoggedIn: boolean;
}

export interface IUser {
  id: number;
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string | number;
  cpf: string | number;
  dt_nascimento: string | number | Date;
  email: string;
  estado: string;
  image: string;
  logradouro: string;
  nome: string;
  senha: string;
  sexo: string;
  sobrenome: string;
  token: string;
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

export interface ISignUpForm {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  senha: string;
  sexo: Gender;
  dt_nascimento: Date | string | number;
  cep: string;
  cidade: string;
  estado: string;
  logradouro: string;
  bairro: string;
  complemento: string;
}
