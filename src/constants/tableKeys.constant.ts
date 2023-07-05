import { ProductWithoutId } from '../interfaces/product.interface';

type ITableKeys = {
  [key in keyof ProductWithoutId]: string;
};

export const tableKeys: ITableKeys = {
  logo: 'Logo',
  name: 'Nombre del producto',
  description: 'Descripción',
  date_release: 'Fecha de liberación',
  date_revision: 'Fecha de reestructuración',
};
