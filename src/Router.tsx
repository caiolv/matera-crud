/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NotFound from './pages/404';
import Login from './pages/Login';
import Product from './pages/Product';
import Products from './pages/Products';
import Register from './pages/Register';
import { IMainState } from './types/store.type';

function PrivateRoute({ children }: { children: ReactNode }) {
  const isLoggedIn = useSelector((state: IMainState) => state.user.isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/404" />;
}

function Router() {
  const isLoggedIn = useSelector((state: IMainState) => state.user.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/products" /> : <Login />}
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/products" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
