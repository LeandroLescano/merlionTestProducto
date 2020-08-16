import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import { IRootState } from 'app/shared/reducers';
import { RouteComponentProps } from 'react-router-dom';
import { getEntities } from 'app/entities/sales/sales.reducer';

function TableProducts(props) {
  const [salesList, setSalesList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jhi-authenticationToken').slice(1, -1);
    const apiUrl = window.location.href + 'api/sales/state/' + props.state;
    fetch(apiUrl, {
      method: 'GET',
      headers: new Headers({
        accept: '*/*',
        Authorization: 'Bearer ' + token,
      }),
    })
      .then(response => response.json())
      .then(data => setSalesList(data))
      .catch(error => {
        console.error(error);
      });
  }, []);

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
        {salesList && salesList.length > 0 && (
          <TableBody>
            {salesList.map((sale, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{sale.id}</TableCell>
                  <TableCell>{sale.product.name}</TableCell>
                  <TableCell>{sale.product.provider.name}</TableCell>
                  <TableCell>{sale.deliveredDate}</TableCell>
                  <TableCell>{sale.amountPaid}</TableCell>
                  <TableCell>{sale.fullPayment}</TableCell>
                  <TableCell>
                    <Button color="primary">Enviar</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </Paper>
  );
}

export default TableProducts;
