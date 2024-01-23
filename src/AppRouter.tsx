/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NotFound from './components/NotFound/intex';
import Login from './pages/Login';
import Products from './pages/Products';
import { IMainState } from './types/store.type';

function PrivateRoute({ children }: { children: ReactNode }) {
  const isLoggedIn = useSelector((state: IMainState) => state.user.isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/login" />;
}

function AppRouter() {
  const isLoggedIn = useSelector((state: IMainState) => state.user.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/products" /> : <Login />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
