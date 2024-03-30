import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login, Register } from '../pages';
import { Router } from './Router';
import { RegisterEmpresa } from '../pages/register-empresa/RegisterEmpresa';
import { Catalogo } from '../pages/catalogo/Catalogo';
import { Layout1 } from '../layout/Layout1';
import { Layout2 } from '../layout/Layout2';

import { AdminInventario } from '../pages/admin-inventario/AdminInventario';
import { Categorias } from '../pages/categorias/Categorias';

const baseurl = import.meta.env.BASE_URL;

const AppRoutes: FC = () => {
  return (
    <BrowserRouter basename={baseurl}>
      <Routes>
        <Route element={<Layout1 />}>
          <Route path={Router.login} element={<Login />} />
          <Route path={Router.register} element={<Register />} />
          <Route path={Router.registeEmpresa} element={<RegisterEmpresa />} />

          <Route path="*" element={<Navigate to={Router.login} />} />
        </Route>
        <Route element={<Layout2 />}>
          <Route path={Router.catalogo} element={<Catalogo />} />
          <Route path={Router.adminInventario} element={<AdminInventario />} />
          <Route path={Router.categorias} element={<Categorias />} />

          <Route path="*" element={<Navigate to={Router.login} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes };