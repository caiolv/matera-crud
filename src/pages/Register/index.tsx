import matera from '@/assets/matera.png';
import TextMaskCustom from '@/components/MaskedInput';
import { useToast } from '@/context/toast';
import { getAddress } from '@/service/cep';
import { createUser } from '@/service/user';
import { ISignUpForm } from '@/types/store.type';
import { isCpfValid } from '@/validators/cpf';
import { Gender, SignUpSchema } from '@/validators/schemas';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik } from 'formik';
import React, { useState } from 'react';
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
  name: '',
  email: '',
  password: '',
  surname: '',
  cpf: '',
  gender: Gender.MALE,
  birthDate: '',
  address: {
    street: '',
    number: '',
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

  const [cpfError, setCpfError] = useState<boolean>(false);

  const redirectToLogin = () => navigate('/login');

  const onSubmit = async (values: ISignUpForm) => {
    const invalidCpf = !isCpfValid(values.cpf);

    if (invalidCpf) {
      setCpfError(true);
      openToast({
        message: 'CPF inválido',
        variant: 'error',
      });
      return;
    }
    setCpfError(false);

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
          address: {
            neighborhood: address.bairro,
            city: address.localidade,
            state: address.uf,
            street: address.logradouro,
            complement: address.complemento,
            zipCode: address.cep,
            number: '',
          },
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
      birthDate: new Date(date.$d || null),
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
              id="name"
              name="name"
              label="Nome"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
          </Item>

          <Item item xs={12} sm={6}>
            <Input
              id="surname"
              name="surname"
              label="Sobrenome"
              value={formik.values.surname}
              onChange={formik.handleChange}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
              onBlur={formik.handleBlur}
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
            />
          </Item>

          <Item item xs={12} sm={6}>
            <Input
              id="password"
              name="password"
              label="Senha"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              onBlur={formik.handleBlur}
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
              error={Boolean(formik.errors.cpf) || cpfError}
              InputProps={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inputComponent: TextMaskCustom as any,
                inputProps: {
                  mask: '000.000.000-00',
                },
              }}
            />
          </Item>

          <Item item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="gender">Gênero</InputLabel>
              <Select
                labelId="gender"
                id="gender-select"
                value={formik.values.gender}
                label="Gênero"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="gender"
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
              id="address.zipCode"
              name="address.zipCode"
              label="CEP"
              value={formik.values.address.zipCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                validateAddress(formik.handleChange, e)
              }
              error={
                formik.touched.address?.zipCode &&
                Boolean(formik.errors.address?.zipCode)
              }
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
              id="address.street"
              name="address.street"
              label="Rua"
              value={formik.values.address.street}
              onChange={formik.handleChange}
              error={
                formik.touched.address?.street &&
                Boolean(formik.errors.address?.street)
              }
              onBlur={formik.handleBlur}
            />
          </Item>

          <Item item xs={12} sm={2}>
            <Input
              id="address.number"
              name="address.number"
              label="Número"
              value={formik.values.address.number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.address?.number &&
                Boolean(formik.errors.address?.number)
              }
            />
          </Item>

          <Item item xs={12} sm={4}>
            <Input
              id="address.neighborhood"
              name="address.neighborhood"
              label="Bairro"
              value={formik.values.address.neighborhood}
              onChange={formik.handleChange}
              error={
                formik.touched.address?.neighborhood &&
                Boolean(formik.errors.address?.neighborhood)
              }
              onBlur={formik.handleBlur}
            />
          </Item>

          <Item item xs={12} sm={4}>
            <Input
              id="address.city"
              name="address.city"
              label="Cidade"
              value={formik.values.address.city}
              onChange={formik.handleChange}
              error={
                formik.touched.address?.city &&
                Boolean(formik.errors.address?.city)
              }
              onBlur={formik.handleBlur}
            />
          </Item>

          <Item item xs={12} sm={4}>
            <Input
              id="address.state"
              name="address.state"
              label="Estado"
              value={formik.values.address.state}
              onChange={formik.handleChange}
              error={
                formik.touched.address?.state &&
                Boolean(formik.errors.address?.state)
              }
              onBlur={formik.handleBlur}
            />
          </Item>

          <Item item xs={12} sm={12}>
            <Input
              id="address.complement"
              name="address.complement"
              label="Complemento (opcional)"
              value={formik.values.address.complement}
              onChange={formik.handleChange}
              error={
                formik.touched.address?.complement &&
                Boolean(formik.errors.address?.complement)
              }
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
