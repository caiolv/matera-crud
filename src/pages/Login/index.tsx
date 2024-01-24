import matera from '@/assets/matera.png';
import { useToast } from '@/context/toast';
import { getUser } from '@/service/user';
import { setLogged } from '@/store/actions/user';
import { ISignInForm } from '@/types/store.type';
import { SignInSchema } from '@/validators/schemas';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  LoginContainer,
  Container,
  Logo,
  Input,
  Button,
  SignInText,
} from './styles';

export default function Login() {
  const dispatch = useDispatch();
  const { openToast } = useToast();

  const initialValues: ISignInForm = {
    email: '',
    password: '',
  };

  const onSubmit = async (values: ISignInForm) => {
    try {
      const user = await getUser(values.email);

      if (user) {
        if (user.password === values.password) {
          dispatch(
            setLogged({
              user,
              isLoggedIn: true,
            }),
          );
        } else {
          openToast({
            message: 'Usuário/senha incorreto(s)',
            variant: 'error',
          });
        }
      } else {
        openToast({
          message: 'Usuário/senha incorreto(s)',
          variant: 'error',
        });
      }
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
    validationSchema: SignInSchema,
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

        <SignInText>
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </SignInText>
      </LoginContainer>
    </Container>
  );
}
