import matera from '@/assets/matera.png';
import { useToast } from '@/context/toast';
import { createUser } from '@/service/user';
import { ISignUpForm } from '@/types/store.type';
import { Gender, SignUpSchema } from '@/validators/schemas';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginContainer, Button, Container, Input, Logo } from './styles';

const initialValues: ISignUpForm = {
  name: '',
  email: '',
  password: '',
  surname: '',
  cpf: '',
  gender: Gender.MALE,
  birthDate: '',
  address: {
    street: '',
    number: 0,
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    complement: '',
  },
};

export default function Register() {
  const { openToast } = useToast();
  const navigate = useNavigate();

  const redirectToLogin = () => navigate('/login');

  const onSubmit = async (values: ISignUpForm) => {
    try {
      await createUser(values);
      redirectToLogin();
    } catch (error) {
      openToast({
        message: 'Erro ao realizar login',
        variant: 'error',
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: SignUpSchema,
    enableReinitialize: true,
  });

  return (
    <Container>
      <LoginContainer>
        <Logo src={matera} alt="" />

        <Input
          name="email"
          type="email"
          label="E-mail"
          placeholder="E-mail"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <Input
          name="password"
          type="password"
          label="Senha"
          placeholder="Senha"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button
          type="submit"
          variant="contained"
          onClick={() => formik.handleSubmit()}
          disabled={!formik.isValid || !formik.dirty}
        >
          Entrar
        </Button>
      </LoginContainer>
    </Container>
  );
}
