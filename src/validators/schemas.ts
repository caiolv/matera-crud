import * as yup from 'yup';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'non_binary',
}

export const SignInSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: yup
    .string()
    .min(8, 'A senha precisa ter 8 caracteres')
    .required('Campo obrigatório'),
});

export const SignUpSchema = yup.object().shape({
  nome: yup.string().required('Campo obrigatório'),
  sobrenome: yup.string().required('Campo obrigatório'),
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  cpf: yup.string().required('Campo obrigatório'),
  senha: yup.string().min(8, 'A senha precisa ter 8 caracteres').required(),
  sexo: yup.mixed().oneOf(Object.values(Gender)).required(),
  logradouro: yup.string().required('Campo obrigatório'),
  complemento: yup.string().required('Campo obrigatório'),
  cidade: yup.string().required('Campo obrigatório'),
  estado: yup.string().required('Campo obrigatório'),
  cep: yup.string().required('Campo obrigatório'),
  bairro: yup.string().required('Campo obrigatório'),
});
