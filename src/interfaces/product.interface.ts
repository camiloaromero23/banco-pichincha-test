export interface Product {
  id: string;
  logo: string;
  name: string;
  date_release: string;
  date_revision: string;
  description: string;
}

export type ProductWithoutId = Omit<Product, 'id'>;

