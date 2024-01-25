import PageLayout from '@/components/PageLayout';
import { getProducts } from '@/service/products';
import { setProducts } from '@/store/actions/products';
import { IMainState } from '@/types/store.type';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ProductItem } from './styles';

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state: IMainState) => state.user);
  const { list } = useSelector((state: IMainState) => state.product);

  const loadProducts = async () => {
    if (list.length === 0 && info?.token) {
      const products = await getProducts();
      dispatch(
        setProducts({
          products,
        }),
      );
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <PageLayout>
      <div>Products</div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Imagem</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Vendidos</TableCell>
            <TableCell>Estoque</TableCell>
            <TableCell>Data de Criação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.length > 0 &&
            list.map((product) => (
              <ProductItem
                key={Math.random()}
                onClick={() => navigate(`/produtos/${product.id}`)}
              >
                <TableCell>
                  {/* <ProductImage src={product.avatar} alt="product" /> */}
                  imagem
                </TableCell>
                <TableCell>
                  {/* <ProductText>{product.nome}</ProductText> */}
                  {product.nome}
                </TableCell>
                <TableCell>
                  {/* <ProductText>{product.marca}</ProductText> */}
                  {product.marca}
                </TableCell>
                <TableCell>
                  {/* <ProductPrice>R$ {product.preco}</ProductPrice> */}
                  {product.preco?.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }) || '-'}
                </TableCell>
                <TableCell>
                  {/* <ProductText>{product.qt_vendas}</ProductText> */}
                  {product.qt_vendas}
                </TableCell>
                <TableCell>
                  {' '}
                  {/* <ProductText>{product.qt_estoque}</ProductText> */}
                  {product.qt_estoque}
                </TableCell>
                <TableCell>
                  {/* <ProductText>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </ProductText> */}
                  {new Date(product.createdAt).toLocaleDateString()}
                </TableCell>
              </ProductItem>
            ))}
        </TableBody>
      </Table>
    </PageLayout>
  );
}
