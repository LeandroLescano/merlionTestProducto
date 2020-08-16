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
import sales from 'app/entities/sales/sales';
import { SalesState } from 'app/entities/sales/sales.reducer';
import axios from 'axios';

function TableProducts(props) {
  const [salesList, setSalesList] = useState([]);

  const getDate = () => {
    var date = new Date();
    var month = date.getMonth() + 1;
    var currentDate = date.getFullYear() + '-' + month.toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
    console.log(currentDate);
    return currentDate;
  };

  const handleChange = object => {
    let dataAct = {};
    const token = localStorage.getItem('jhi-authenticationToken').slice(1, -1);
    const apiUrl = window.location.href + 'api/sales';
    setSalesList(salesList.filter(sale => sale.id !== object.id));
    let newState = '';
    let newFinalDate = '';
    if (object.state === 'IN_CHARGE') {
      newState = 'SHIPPED';
      newFinalDate = object.finalDeliveredDate;
    } else if (object.state === 'SHIPPED') {
      newState = 'DELIVERED';
      newFinalDate = getDate();
    }
    dataAct = {
      amountPaid: object.amountPaid,
      deliveredDate: object.deliveredDate,
      finalDeliveredDate: newFinalDate,
      fullPayment: object.fullPayment,
      id: object.id,
      product: {
        id: object.product.id,
        name: object.product.name,
        provider: {
          id: object.product.provider.id,
          name: object.product.provider.name,
        },
      },
      state: newState,
    };

    axios({
      url: apiUrl,
      method: 'PUT',
      headers: {
        accept: '*/*',
        ContentType: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      data: dataAct,
    })
      .then(response => console.log(response))
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem('jhi-authenticationToken').slice(1, -1);
    const apiUrl = window.location.href + 'api/sales/state/' + props.state;
    if (mounted) {
      axios({
        url: apiUrl,
        method: 'GET',
        headers: {
          accept: '*/*',
          Authorization: 'Bearer ' + token,
        },
      })
        .then(response => setSalesList(response.data))
        .catch(error => {
          console.error(error);
        });
    }
    return () => (mounted = false);
  }, [props]);

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Proveedor</TableCell>
            <TableCell>Fecha de entrega </TableCell>
            <TableCell>Pagado</TableCell>
            <TableCell>Pago total</TableCell>
            {props.state !== 'DELIVERED' ? <TableCell></TableCell> : <TableCell>Fecha de entrega final</TableCell>}
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
                    {props.state !== 'DELIVERED' ? (
                      props.state === 'IN_CHARGE' ? (
                        <Button color="primary" onClick={() => handleChange(sale)}>
                          Enviar
                        </Button>
                      ) : (
                        <Button color="primary" onClick={() => handleChange(sale)}>
                          Entregado
                        </Button>
                      )
                    ) : (
                      sale.finalDeliveredDate
                    )}
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
