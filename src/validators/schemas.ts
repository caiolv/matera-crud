import * as yup from 'yup';

export const SignInSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: yup
    .string()
    .min(8, 'A senha precisa ter 8 caracteres')
    .required('Campo obrigatório'),
});
