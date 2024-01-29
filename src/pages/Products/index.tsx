import PageLayout from '@/components/PageLayout';
import ProductModal from '@/components/ProductModal';
import { getProducts } from '@/service/products';
import { setProducts } from '@/store/actions/products';
import { IMainState } from '@/types/store.type';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  Item,
  PageActions,
  PageHeader,
  PageTitle,
  Pagination,
  ProductImage,
  ProductItem,
} from './styles';

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list } = useSelector((state: IMainState) => state.product);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePaginationChange = (
    _: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  const loadProducts = async () => {
    const products = await getProducts();
    dispatch(
      setProducts({
        products,
      }),
    );
  };

  const filteredProducts = useMemo(() => {
    if (filter) {
      return list.filter(
        (produto) =>
          produto.nome.toLowerCase().includes(filter.toLowerCase()) ||
          produto.marca.toLowerCase().includes(filter.toLowerCase()) ||
          produto.preco?.toString().includes(filter.toLowerCase()),
      );
    }
    return list;
  }, [filter, list]);

  const elementsByPage = useMemo(() => {
    const start = currentPage * 15;
    const end = start + 15;

    if (filter) {
      return filteredProducts;
    }

    return list.slice(start, end);
  }, [currentPage, filter, filteredProducts, list]);

  const totalPages = useMemo(() => {
    if (filter) {
      const filterLen = filteredProducts.length / 15;

      return Math.floor(filterLen > 1 ? filterLen : 1);
    }
    return Math.floor(list.length / 15);
  }, [filter, filteredProducts, list]);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <PageLayout>
      <PageHeader container spacing={2}>
        <Item item sm={12} md={6}>
          <PageTitle variant="h2">Produtos</PageTitle>
        </Item>

        <Item item sm={12} md={6}>
          <PageActions
            sx={{
              justifyContent: {
                sm: 'flex-start',
                md: 'flex-end', // flex-end alignment for sm screens and larger
              },
            }}
          >
            <Input
              placeholder="Pesquisar"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            />
            <Button
              variant="contained"
              onClick={() => setCreateModalOpen(true)}
            >
              Novo produto
            </Button>
          </PageActions>
        </Item>
      </PageHeader>

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
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.length > 0 &&
            elementsByPage.map((product) => (
              <ProductItem
                key={Math.random()}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <TableCell>
                  <ProductImage
                    src={product.avatar}
                    alt={product.nome}
                    width="100"
                    height="100"
                  />
                </TableCell>
                <TableCell>{product.nome}</TableCell>
                <TableCell>{product.marca}</TableCell>
                <TableCell>
                  {product.preco?.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }) || '-'}
                </TableCell>
                <TableCell>{product.qt_vendas}</TableCell>
                <TableCell> {product.qt_estoque}</TableCell>
                <TableCell>
                  {new Date(product.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Link to={`/products/${product.id}`}>
                    <VisibilityIcon />
                  </Link>
                </TableCell>
              </ProductItem>
            ))}
        </TableBody>
      </Table>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePaginationChange}
      />
      <ProductModal
        handleClose={() => setCreateModalOpen(false)}
        open={createModalOpen}
        product={null}
      />
    </PageLayout>
  );
}
