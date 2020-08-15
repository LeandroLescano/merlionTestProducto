import { IProduct } from 'app/shared/model/product.model';

export interface IProviders {
  id?: number;
  name?: string;
  product?: IProduct;
}

export const defaultValue: Readonly<IProviders> = {};
