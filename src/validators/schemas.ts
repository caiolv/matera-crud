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

const AddressSchema = yup.object().shape({
  street: yup.string().required('Campo obrigatório'),
  number: yup.string().required('Campo obrigatório'),
  city: yup.string().required('Campo obrigatório'),
  state: yup.string().required('Campo obrigatório'),
  zipcode: yup.string().required('Campo obrigatório'),
  complement: yup.string(),
});

export const SignUpSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  surname: yup.string().required('Campo obrigatório'),
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: yup.string().required(),
  gender: yup.mixed().oneOf(Object.values(Gender)).required(),
  address: AddressSchema,
});
