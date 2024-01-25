import ConfirmationModal from '@/components/ConfirmationModal';
import PageLayout from '@/components/PageLayout';
import ProductModal from '@/components/ProductModal';
import { deleteProduct, getProduct } from '@/service/products';
import { deleteProduct as deleteAction } from '@/store/actions/products';
import { IProduct } from '@/types/store.type';
import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  ButtonsContainer,
  ProductBox,
  ProductContainer,
  ProductHeader,
  ProductImage,
} from './style';

export default function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const [product, setProduct] = useState<IProduct | null>(null);

  const loadInfo = async () => {
    if (id) {
      try {
        const response = await getProduct(id);
        setProduct(response);
      } catch (error) {
        navigate('/404');
      }
    }
  };

  useEffect(() => {
    loadInfo();
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      await deleteProduct(id);
      if (product) {
        dispatch(
          deleteAction({
            product,
          }),
        );
      }
      navigate('/products');
    }
  };

  return (
    <PageLayout>
      <ProductContainer>
        <ProductHeader>
          <Typography variant="h4">{product?.nome}</Typography>
          <ButtonsContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditModalOpen(true)}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setDeleteModalOpen(true)}
            >
              Excluir
            </Button>
          </ButtonsContainer>
        </ProductHeader>

        <ProductBox>
          <ProductImage src={product?.avatar} alt={product?.nome} />
          <div>
            <Typography variant="h6">{product?.marca}</Typography>
            <Typography variant="h6">
              {product?.preco?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Typography>
            <Typography variant="body1">
              Vendidos:{' '}
              {product?.qt_vendas?.toLocaleString('pt-BR', {
                currency: 'BRL',
              })}
            </Typography>
            <Typography variant="body1">
              Em estoque:{' '}
              {product?.qt_estoque?.toLocaleString('pt-BR', {
                currency: 'BRL',
              })}
            </Typography>
          </div>
        </ProductBox>
      </ProductContainer>
      <ProductModal
        open={editModalOpen}
        handleClose={() => setEditModalOpen(false)}
        product={product}
      />
      <ConfirmationModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        confirmAction={() => handleDelete()}
        cancelAction={() => setDeleteModalOpen(false)}
      />
    </PageLayout>
  );
}
