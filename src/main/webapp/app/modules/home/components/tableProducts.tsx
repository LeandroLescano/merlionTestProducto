import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

function TableProducts() {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Proveedor</TableCell>
            <TableCell>Fecha de entrega</TableCell>
            <TableCell>Pagado</TableCell>
            <TableCell>Pago total</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
    </Paper>
  );
}

export default TableProducts;
