import matera from '@/assets/matera.png';
import TextMaskCustom from '@/components/MaskedInput';
import { useToast } from '@/context/toast';
import { getAddress } from '@/service/cep';
import { createUser } from '@/service/user';
import { ISignUpForm } from '@/types/store.type';
import { Gender, SignUpSchema } from '@/validators/schemas';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  SignUpContainer,
  Button,
  Container,
  Input,
  Logo,
  Item,
  FormContainer,
  DatePicker,
} from './styles';

const initialValues: ISignUpForm = {
  nome: '',
  email: '',
  senha: '',
  sobrenome: '',
  cpf: '',
  sexo: Gender.MALE,
  dt_nascimento: '',
  cep: '',
  logradouro: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
};

export default function Register() {
  const { openToast } = useToast();
  const navigate = useNavigate();

  const redirectToLogin = () => navigate('/login');

  const onSubmit = async (values: ISignUpForm) => {
    try {
      await createUser(values);
      redirectToLogin();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      openToast({
        message: `Erro ao registrar usuário: ${error.response.data}`,
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

  const validateAddress = async (
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleChange(event);
    const cep = event.target.value;
    const formattedCep = cep.replace(/\D/g, '');

    if (formattedCep.length === 8) {
      try {
        const address = await getAddress(formattedCep);
        formik.setValues({
          ...formik.values,
          bairro: address.bairro,
          cidade: address.localidade,
          estado: address.uf,
          logradouro: address.logradouro,
          complemento: address.complemento,
          cep: address.cep,
        });
      } catch (error) {
        openToast({
          message: 'Erro ao buscar endereço',
          variant: 'error',
        });
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDate = (date: any) => {
    formik.setValues({
      ...formik.values,
      dt_nascimento: new Date(date.$d || null),
    });
  };

  return (
    <Container>
      <SignUpContainer>
        <Item item xs={12}>
          <Logo src={matera} alt="" />
        </Item>
        <FormContainer container spacing={2}>
          <Item item xs={12} sm={6}>
            <Input
              id="nome"
              name="nome"
              label="Nome"
              value={formik.values.nome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nome && Boolean(formik.errors.nome)}
              helperText={formik.touched.nome && formik.errors.nome}
            />
          </Item>

          <Item item xs={12} sm={6}>
            <Input
              id="sobrenome"
              name="sobrenome"
              label="Sobrenome"
              value={formik.values.sobrenome}
              onChange={formik.handleChange}
              error={
                formik.touched.sobrenome && Boolean(formik.errors.sobrenome)
              }
              onBlur={formik.handleBlur}
              helperText={formik.touched.sobrenome && formik.errors.sobrenome}
            />
          </Item>

          <Item item xs={12} sm={6}>
            <Input
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              onBlur={formik.handleBlur}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Item>

          <Item item xs={12} sm={6}>
            <Input
              id="senha"
              name="senha"
              label="Senha"
              type="password"
              value={formik.values.senha}
              onChange={formik.handleChange}
              error={formik.touched.senha && Boolean(formik.errors.senha)}
              onBlur={formik.handleBlur}
              helperText={formik.touched.senha && formik.errors.senha}
            />
          </Item>
          <Item item xs={12} sm={4}>
            <Input
              id="cpf"
              label="CPF"
              variant="outlined"
              type="text"
              value={formik.values.cpf}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="cpf"
              error={formik.touched.senha && Boolean(formik.errors.cpf)}
              InputProps={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inputComponent: TextMaskCustom as any,
                inputProps: {
                  mask: '000.000.000-00',
                },
              }}
              helperText={formik.touched.cpf && formik.errors.cpf}
            />
          </Item>

          <Item item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="sexo">Gênero</InputLabel>
              <Select
                labelId="sexo"
                id="sexo-select"
                value={formik.values.sexo}
                label="Gênero"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="sexo"
              >
                <MenuItem value={Gender.MALE}>Masculino</MenuItem>
                <MenuItem value={Gender.FEMALE}>Feminino</MenuItem>
                <MenuItem value={Gender.NON_BINARY}>Não binário</MenuItem>
              </Select>
            </FormControl>
          </Item>

          <Item item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Data de Nascimento"
                onChange={(value) => handleDate(value)}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
          </Item>

          <Item item xs={12} sm={4}>
            <Input
              id="cep"
              name="cep"
              label="CEP"
              value={formik.values.cep}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                validateAddress(formik.handleChange, e)
              }
              error={formik.touched.cep && Boolean(formik.errors.cep)}
              onBlur={formik.handleBlur}
              InputProps={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inputComponent: TextMaskCustom as any,
                inputProps: {
                  mask: '00000-000',
                },
              }}
            />
          </Item>

          <Item item xs={12} sm={6}>
            <Input
              id="logradouro"
              name="logradouro"
              label="Rua"
              value={formik.values.logradouro}
              onChange={formik.handleChange}
              error={
                formik.touched.logradouro && Boolean(formik.errors.logradouro)
              }
              onBlur={formik.handleBlur}
            />
          </Item>

          <Item item xs={12} sm={2}>
            <Input
              id="complemento"
              name="complemento"
              label="Complemento"
              value={formik.values.complemento}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.complemento && Boolean(formik.errors.complemento)
              }
            />
          </Item>

          <Item item xs={12} sm={4}>
            <Input
              id="bairro"
              name="bairro"
              label="Bairro"
              value={formik.values.bairro}
              onChange={formik.handleChange}
              error={formik.touched.bairro && Boolean(formik.errors.bairro)}
              onBlur={formik.handleBlur}
            />
          </Item>

          <Item item xs={12} sm={4}>
            <Input
              id="cidade"
              name="cidade"
              label="Cidade"
              value={formik.values.cidade}
              onChange={formik.handleChange}
              error={formik.touched.cidade && Boolean(formik.errors.cidade)}
              onBlur={formik.handleBlur}
            />
          </Item>

          <Item item xs={12} sm={4}>
            <Input
              id="estado"
              name="estado"
              label="Estado"
              value={formik.values.estado}
              onChange={formik.handleChange}
              error={formik.touched.estado && Boolean(formik.errors.estado)}
              onBlur={formik.handleBlur}
            />
          </Item>

          <Item item xs={12} sm={5}>
            <Button
              type="button"
              variant="text"
              onClick={() => redirectToLogin()}
            >
              Voltar para o login
            </Button>
          </Item>

          <Item item xs={12} sm={2} />

          <Item item xs={12} sm={5}>
            <Button
              type="submit"
              variant="contained"
              onClick={() => formik.handleSubmit()}
              disabled={!formik.isValid || !formik.dirty}
            >
              Cadastrar
            </Button>
          </Item>
        </FormContainer>
      </SignUpContainer>
    </Container>
  );
}
