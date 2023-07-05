import { DataWithoutId } from '../interfaces/data.interface';

type ITableKeys = {
  [key in keyof DataWithoutId]: string;
};

export const tableKeys: ITableKeys = {
  logo: 'Logo',
  name: 'Nombre del producto',
  description: 'Descripción',
  date_release: 'Fecha de liberación',
  date_revision: 'Fecha de reestructuración',
};
