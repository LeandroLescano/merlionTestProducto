import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISalesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SalesDetail = (props: ISalesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { salesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="testApp.sales.detail.title">Sales</Translate> [<b>{salesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="state">
              <Translate contentKey="testApp.sales.state">State</Translate>
            </span>
          </dt>
          <dd>{salesEntity.state}</dd>
          <dt>
            <span id="deliveredDate">
              <Translate contentKey="testApp.sales.deliveredDate">Delivered Date</Translate>
            </span>
          </dt>
          <dd>
            {salesEntity.deliveredDate ? <TextFormat value={salesEntity.deliveredDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="finalDeliveredDate">
              <Translate contentKey="testApp.sales.finalDeliveredDate">Final Delivered Date</Translate>
            </span>
          </dt>
          <dd>
            {salesEntity.finalDeliveredDate ? (
              <TextFormat value={salesEntity.finalDeliveredDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="amountPaid">
              <Translate contentKey="testApp.sales.amountPaid">Amount Paid</Translate>
            </span>
          </dt>
          <dd>{salesEntity.amountPaid}</dd>
          <dt>
            <span id="fullPayment">
              <Translate contentKey="testApp.sales.fullPayment">Full Payment</Translate>
            </span>
          </dt>
          <dd>{salesEntity.fullPayment}</dd>
          <dt>
            <Translate contentKey="testApp.sales.product">Product</Translate>
          </dt>
          <dd>{salesEntity.product ? salesEntity.product.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/sales" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sales/${salesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesEntity: sales.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesDetail);
