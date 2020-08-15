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

export interface ISalesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TableProducts = (props: ISalesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { salesList, match, loading } = props;

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
            {salesList
              .filter(s => s.state === 'IN_CHARGE')
              .map((sale, i) => {
                return (
                  <TableRow>
                    <TableCell key={i}>{sale.id}</TableCell>
                    <TableCell key={i}>{sale.product.name}</TableCell>
                    <TableCell key={i}>{sale.product.provider.name}</TableCell>
                    <TableCell key={i}>{sale.deliveredDate}</TableCell>
                    <TableCell key={i}>{sale.amountPaid}</TableCell>
                    <TableCell key={i}>{sale.fullPayment}</TableCell>
                    <TableCell key={i}>
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
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesList: sales.entities,
  loading: sales.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TableProducts);
