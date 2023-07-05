import { ChangeEvent, useEffect, useState } from 'react';
import { Data } from '../interfaces/data.interface';
import { pluralize } from '../utils/pluralize';
import { useFilter } from './useFilter';

interface UseData {
  count: string;
  data: Data[];
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

export const useData = (): UseData => {
  const [data, setData] = useState<Data[]>([]);

  const [count, setCount] = useState<string>('');

  const { filteredData, search, setSearch } = useFilter(data, 'name');

  useEffect(() => {
    setData([
      {
        id: '1',
        logo: 'logo',
        name: 'Nombre del producto',
        description: 'Descripción',
        date_release: '01/05/2000',
        date_revision: '01/01/2001',
      },
      {
        id: '2',
        logo: 'logo',
        name: 'Nombre del producto',
        description: 'Descripción',
        date_release: '01/05/2000',
        date_revision: '01/01/2001',
      },
      {
        id: '3',
        logo: 'logo',
        name: 'Nombre del producto',
        description: 'Descripción',
        date_release: '01/05/2000',
        date_revision: '01/01/2001',
      },
      {
        id: '4',
        logo: 'logo',
        name: 'Nombre del producto',
        description: 'Descripción',
        date_release: '01/05/2000',
        date_revision: '01/01/2001',
      },
      {
        id: '5',
        logo: 'logo',
        name: 'Nimbre del producto',
        description: 'Descripción',
        date_release: '01/05/2000',
        date_revision: '01/01/2001',
      },
    ]);
  }, []);

  useEffect(() => {
    setCount(pluralize(data.length, 'Resultado', 'Resultados'));
  }, [data]);

  useEffect(() => {
    setCount(pluralize(filteredData.length, 'Resultado', 'Resultados'));
  }, [search, filteredData, data]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return {
    count,
    data: filteredData,
    search,
    handleSearchChange,
  };
};
