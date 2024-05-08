import { FC, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login, Verificar, Register } from '../pages';
import { Router } from './Router';
import { RegisterEmpresa } from '../pages/register-empresa/RegisterEmpresa';
import { Catalogo } from '../pages/catalogo/Catalogo';
import { Layout1 } from '../layout/Layout1';
import { Layout2 } from '../layout/Layout2';

import { AdminInventario } from '../pages/admin-inventario/AdminInventario';
import { Categorias } from '../pages/categorias/Categorias';
import { AdminUsuarios } from '../pages/admin-usuarios/AdminUsuarios';
import { Detalle } from '../pages/detalle/Detalle';
import { AdminFacturas } from '../pages/admin-facturas/AdminFacturas';
import { AdminLog } from '../pages/admin-log/AdminLog';
import { Principal } from '../pages/principal/Principal';
import { Carrito } from '../pages/carrito/Carrito';
import { ProcesoCompraConfirmar } from '../pages/proceso-compra-confirmar/ProcesoCompraConfirmar';
import { ProcesoCompraDatos } from '../pages/proceso-compra-datos/ProcesoCompraDatos';
import { ProcesoCompraPago } from '../pages/proceso-compra-pago/ProcesoCompraPago';
import { ProcesoFactura } from '../pages/proceso-compra-pago/ProcesoFactura';
import { HistorialCompra } from '../pages/user-historialCompra/HistorialCompra';
import { UserCuenta } from '../pages/user-cuenta/UserCuenta';
import { useAuth } from '@/hooks/useAuth';
import { UserFavoritos } from '../pages/user-favoritos/UserFavoritos';

const baseurl = import.meta.env.BASE_URL;

const AppRoutes: FC = () => {

  const auth = useAuth(s => s.auth)

  useEffect(() => {
    auth();
  }, [])

  return (
    <BrowserRouter basename={baseurl}>
      <Routes>
        <Route element={<Layout1 />}>
          <Route path={Router.login} element={<Login />} />
          <Route path={Router.verificar} element={<Verificar />} />
          <Route path={Router.register} element={<Register/>} />
          <Route path={Router.registeEmpresa} element={<RegisterEmpresa />} />

          <Route path="*" element={<Navigate to={Router.login} />} />
        </Route>
        <Route element={<Layout2 />}>
          <Route path={Router.catalogo} element={<Catalogo />} />
          <Route path={Router.adminInventario} element={<AdminInventario />} />
          <Route path={Router.adminUsuarios} element={<AdminUsuarios />} />
          <Route path={Router.adminFacturas} element={<AdminFacturas />} />
          <Route path={Router.adminLog} element={<AdminLog />} />
          <Route path={Router.categorias} element={<Categorias />} />
          <Route path={Router.detalle} element={<Detalle />} />
          <Route path={Router.carrito} element={<Carrito />} />
          <Route path={Router.principal} element={<Principal />} />
          <Route path={Router.procesoCompraConfirmar} element={<ProcesoCompraConfirmar />} />
          <Route path={Router.procesoCompraDatos} element={<ProcesoCompraDatos />} />
          <Route path={Router.procesoCompraPago} element={<ProcesoCompraPago />} />
          <Route path={Router.procesoFactura} element={<ProcesoFactura />} />
          <Route path={Router.historialCompra} element={<HistorialCompra />} />
          <Route path={Router.userCuenta} element={<UserCuenta />} />
          <Route path={Router.userFavoritos} element={<UserFavoritos />} />


          <Route path="*" element={<Navigate to={Router.login} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes };