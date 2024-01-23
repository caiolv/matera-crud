import { useFormik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';

import matera from '../../assets/matera.png';
import { getUser } from '../../service/user';
import { ISignInForm } from '../../types/store.type';
import { SignInSchema } from '../../validators/schemas';
import {
  LoginContainer,
  Container,
  Logo,
  Input,
  Button,
  SignInText,
} from './styles';

export default function Login() {
  const initialValues: ISignInForm = {
    email: '',
    password: '',
  };

  const onSubmit = async (values: ISignInForm) => {
    try {
      const user = await getUser(values.email);

      if (user) {
        if (user.password === values.password) {
          console.log('Usuário logado');
        } else {
          console.log('Senha incorreta');
        }
      } else {
        console.log('Usuário não encontrado');
      }
    } catch (error) {
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
