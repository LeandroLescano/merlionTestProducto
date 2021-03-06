import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import AlertSuccess from './alertSuccess';

function TableProducts(props) {
  const [alertShow, setAlertShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState<string>('');

  const getDate = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const currentDate = date.getFullYear() + '-' + month.toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
    return currentDate;
  };

  const handleChange = productToUpdate => {
    let token = '';
    axios({ url: window.location.href + 'api/authenticate' })
      .then(response => (token = response.config.headers.Authorization))
      .catch(error => console.error(error));
    const apiUrl = window.location.href + 'api/sales';
    let msg = '';
    let newState = productToUpdate.state;
    let newFinalDate = '';

    //  Check actual state to assign the new state
    if (productToUpdate.state === 'IN_CHARGE') {
      newState = 'SHIPPED';
      newFinalDate = productToUpdate.finalDeliveredDate;
      msg = 'Venta Nro.' + productToUpdate.id + ' enviada exitosamente!';
    } else if (productToUpdate.state === 'SHIPPED') {
      newState = 'DELIVERED';
      newFinalDate = getDate();
      msg = 'Venta Nro.' + productToUpdate.id + ' entregada exitosamente!';
    }

    //  Update object to modify in the db by the API
    productToUpdate.state = newState;
    productToUpdate.finalDeliveredDate = newFinalDate;

    //  Call API for update the sale
    axios({
      url: apiUrl,
      method: 'PUT',
      headers: {
        accept: '*/*',
        ContentType: 'application/json',
        Authorization: token,
      },
      data: productToUpdate,
    })
      .then(() => {
        //  Show success alert and update list in home.tsx
        setAlertShow(true);
        setAlertMsg(msg);
        props.handleUpdate(productToUpdate);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
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
          {props.list && props.list.length > 0 ? (
            <TableBody>
              {props.list.map((sale, i) => {
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
                          <Button className={`${props.styles.button}`} onClick={() => handleChange(sale)}>
                            Enviar
                          </Button>
                        ) : (
                          <Button className={`${props.styles.button}`} onClick={() => handleChange(sale)}>
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
          ) : (
            <TableBody>
              <TableRow>
                <TableCell className="text-center" colSpan={7}>
                  <h5>No se han encontrado registros</h5>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </Paper>
      <AlertSuccess show={alertShow} message={alertMsg} close={() => setAlertShow(false)} />
    </>
  );
}

export default TableProducts;
