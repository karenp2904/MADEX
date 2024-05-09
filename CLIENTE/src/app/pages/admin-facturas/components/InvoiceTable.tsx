import { Router } from "@/app/router/Router";
import { useAuth } from "@/hooks/useAuth";
import { IFactura } from "@/models/interfaces/IFactura";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/ui/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

  
 
  
  export function InvoiceTable() {

    const user = useAuth(s => s.user);
    const navigate = useNavigate();
    const [facturas, setFacutaras] = useState<IFactura[]>([]);

    useEffect(() => {
      console.log(user)
      if(!user) {
         //alert("El usuario no esta logeado");
         //navigate(Router.login)
        return
      }
      axios.get(`http://localhost:3000/usuario/historialCompra?id_usuario=${user.id_usuario}`)
        .then((res) => {
          setFacutaras(res.data)
        });
    }, [user]);
    
    return (
      <Table>
        <TableCaption>Lista de tus facturas recientes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Factura</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {facturas.map((invoice) => (
            <TableRow key={invoice.id_factura}>
              <TableCell className="font-medium">{invoice.id_factura}</TableCell>
              <TableCell>{invoice.id_usuario}</TableCell>
              <TableCell>{invoice.fecha ? new Date(invoice.fecha).toISOString().split('T')[0] : ""}</TableCell>
              <TableCell className="text-right">${invoice.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">${facturas.reduce((p, c) => p + parseFloat(c.total), 0)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }

  export default InvoiceTable;
  