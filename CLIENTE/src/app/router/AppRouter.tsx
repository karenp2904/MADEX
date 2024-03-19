import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout';
import { Login, Register } from '../pages';
import { Router } from './Router';
import { RegisterEmpresa } from '../pages/register-empresa/RegisterEmpresa';

const baseurl = import.meta.env.BASE_URL;

const AppRoutes: FC = () => {
  return (
    <BrowserRouter basename={baseurl}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={Router.login} element={<Login />} />
          <Route path={Router.register} element={<Register />} />
          <Route path={Router.registeEmpresa} element={<RegisterEmpresa />} />

          <Route path="*" element={<Navigate to={Router.login} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes };