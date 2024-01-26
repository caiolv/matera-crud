import { useToast } from '@/context/toast';
import { addProduct, editProduct } from '@/service/products';
import { IProduct, IProductData } from '@/types/store.type';
import { ProductSchema } from '@/validators/schemas';
import { Backdrop, Grid, Modal, Stack } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  editProduct as editAction,
  addProduct as addAction,
} from '../../store/actions/products';
import ImageInput from '../ImageInput';
import {
  Button,
  FormContainer,
  Input,
  ModalContainer,
  ModalContent,
  ModalTitle,
  PreviewImage,
} from './styles';

interface IProductModal {
  open: boolean;
  handleClose: () => void;
  product: IProduct | null;
}

const initialValues: IProductData = {
  nome: '',
  avatar: '',
  marca: '',
  preco: '',
  createdAt: new Date().toDateString(),
  qt_estoque: 0,
  qt_vendas: 0,
};

export default function ProductModal({
  open,
  handleClose,
  product,
}: IProductModal) {
  const dispatch = useDispatch();
  const { openToast } = useToast();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [priceInputValue, setPriceInputValue] = useState<string>('');
  const [loading, setLoading] = React.useState(false);

  const onClose = () => {
    setSelectedImage(null);
    setImageUrl('');
    handleClose();
  };

  const saveToStore = (product: unknown) => {
    if (id) {
      dispatch(
        editAction({
          product: product as unknown as IProduct,
        }),
      );
    } else {
      dispatch(
        addAction({
          product: {
            product: product as unknown as IProduct,
          } as unknown as IProduct,
        }),
      );
    }
  };

  const onSubmit = async (values: IProductData) => {
    try {
      setLoading(true);
      const response = id
        ? await editProduct(values, id)
        : await addProduct(values);

      if (response) {
        saveToStore(response);
        onClose();
      } else {
        throw new Error('Erro ao obter produto');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
      openToast({
        message: `Erro ao salvar produto: ${error.response.data}`,
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: ProductSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setImageUrl(url);
      formik.setValues({
        ...formik.values,
        avatar: url,
      });
    }
  }, [selectedImage]);

  useEffect(() => {
    if (product) {
      setImageUrl(product.avatar);
      const numericValue =
        parseInt(product.preco.toString().replace(/[^0-9]/g, ''), 10) / 100;
      const formattedValue = numericValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      formik.setValues({
        ...product,
        preco: numericValue.toFixed(2).toString(),
      });
      setPriceInputValue(formattedValue);
    }
  }, [product]);

  const editButton = loading ? 'Salvando...' : 'Salvar';
  const createButton = loading ? 'Criando...' : 'Criar';
  const submitLabel = id ? editButton : createButton;

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event?.target.value;
    const numeric = parseInt(rawValue.replace(/[^0-9]/g, ''), 10) / 100;
    if (Number.isNaN(numeric)) {
      return;
    }
    const formattedValue = numeric.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    setPriceInputValue(formattedValue);
    formik.setFieldValue('preco', numeric.toFixed(2).toString());
  };

  const title = product ? 'Editar Produto' : 'Criar Produto';
  return (
    <Modal
      open={open}
      onClose={() => onClose()}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <ModalContainer>
        <ModalContent>
          <Stack>
            <ModalTitle variant="h4">{title}</ModalTitle>
            <FormContainer container spacing={2}>
              {imageUrl && (
                <Grid item xs={12} display="flex" justifyContent="center">
                  <PreviewImage src={imageUrl} alt="preview" />
                </Grid>
              )}
              <Grid item xs={12} display="flex" justifyContent="center">
                <ImageInput onChange={setSelectedImage} />
              </Grid>
              <Grid item xs={12}>
                <Input
                  id="nome"
                  label="Nome"
                  variant="outlined"
                  type="text"
                  value={formik.values.nome}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="nome"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id="marca"
                  label="Marca"
                  variant="outlined"
                  type="text"
                  value={formik.values.marca}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="marca"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id="preco"
                  label="Preço"
                  variant="outlined"
                  type="text"
                  value={priceInputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handlePrice(e)
                  }
                  onBlur={formik.handleBlur}
                  name="preco"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id="estoque"
                  label="Estoque"
                  variant="outlined"
                  type="number"
                  value={formik.values.qt_estoque}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="qt_estoque"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id="vendas"
                  label="Vendas"
                  variant="outlined"
                  type="number"
                  value={formik.values.qt_vendas}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="qt_vendas"
                />
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="center">
                <Button variant="outlined" onClick={() => onClose()}>
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  onClick={() => formik.handleSubmit()}
                  disabled={!formik.isValid || !formik.dirty}
                >
                  {submitLabel}
                </Button>
              </Grid>
            </FormContainer>
          </Stack>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}
