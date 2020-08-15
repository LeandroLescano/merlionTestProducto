import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';
import { State } from 'app/shared/model/enumerations/state.model';

export interface ISales {
  id?: number;
  state?: State;
  deliveredDate?: string;
  finalDeliveredDate?: string;
  amountPaid?: number;
  fullPayment?: number;
  product?: IProduct;
}

export const defaultValue: Readonly<ISales> = {};
