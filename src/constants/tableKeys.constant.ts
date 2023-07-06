import { Product, ProductWithoutId } from '../interfaces/product.interface';

type ITableKeys = {
  [key in keyof ProductWithoutId]: string;
};

interface FormField {
  label: string;
  type: HTMLInputElement['type'];
  disabled?: boolean;
}

type IFormFields = {
  [key in keyof Product]: FormField;
};

export const tableKeys: ITableKeys = {
  logo: 'Logo',
  name: 'Nombre del producto',
  description: 'Descripción',
  date_release: 'Fecha de liberación',
  date_revision: 'Fecha de reestructuración',
};

// export const formFields: IFormFields = {
//   id: 'ID',
//   name: 'Nombre',
//   description: 'Descripción',
//   logo: 'Logo',
//   date_release: 'Fecha Liberación',
//   date_revision: 'Fecha Revisión',
// };

export const formFields: IFormFields = {
  id: {
    label: 'ID',
    type: 'text',
    disabled: false,
  },
  name: {
    label: 'Nombre',
    type: 'text',
    disabled: false,
  },
  description: {
    label: 'Descripción',
    type: 'text',
    disabled: false,
  },
  logo: {
    label: 'Logo',
    type: 'text',
    disabled: false,
  },
  date_release: {
    label: 'Fecha Liberación',
    type: 'date',
    disabled: false,
  },
  date_revision: {
    label: 'Fecha Revisión',
    type: 'date',
    disabled: true,
  },
};
