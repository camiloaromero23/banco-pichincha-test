export interface Data {
  id: string;
  logo: string;
  name: string;
  date_release: string;
  date_revision: string;
  description: string;
}

export type DataWithoutId = Omit<Data, 'id'>;

