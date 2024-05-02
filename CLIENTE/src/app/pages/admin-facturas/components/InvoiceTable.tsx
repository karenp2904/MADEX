import { IFactura } from "@/models/interfaces/IFactura";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/ui/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";

  
 
  
  export function InvoiceTable() {

    const [facturas, setFacutaras] = useState<IFactura[]>([]);

    useEffect(() => {
      axios.get("http://localhost:3000/usuario/historialCompra?id_usuario=1097490756")
        .then((res) => {
          setFacutaras(res.data)
        });
    }, []);
    
    return (
      <Table>
        <TableCaption>Lista de tus facturas recientes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {facturas.map((invoice) => (
            <TableRow key={invoice.id_factura}>
              <TableCell className="font-medium">{invoice.id_factura}</TableCell>
              <TableCell>{invoice.id_usuario}</TableCell>
              <TableCell>{invoice.fecha}</TableCell>
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
  