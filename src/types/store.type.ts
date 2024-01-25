export interface IMainState {
  user: IUserState;
  product: ProductState;
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

export interface IProduct {
  id: number;
  avatar: string;
  createdAt: string;
  marca: string;
  nome: string;
  preco: number;
  qt_estoque: number;
  qt_vendas: number;
}

export interface IProductForm {
  avatar: string;
  createdAt: string;
  marca: string;
  nome: string;
  preco: string;
  qt_estoque: number;
  qt_vendas: number;
}

export type ProductAction = {
  product: IProduct;
};

export type ProductsAction = {
  products: IProduct[];
};

export type ProductState = {
  list: IProduct[];
  currentPage: number;
  lastSeen: IProduct[];
  filter: string;
};

export interface IProductData {
  avatar: string;
  createdAt: string;
  marca: string;
  nome: string;
  preco: string;
  qt_estoque: number;
  qt_vendas: number;
}

export type PageAction = {
  page: number;
};
