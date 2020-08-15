import { IProviders } from 'app/shared/model/providers.model';

export interface IProduct {
  id?: number;
  name?: string;
  provider?: IProviders;
}

export const defaultValue: Readonly<IProduct> = {};
