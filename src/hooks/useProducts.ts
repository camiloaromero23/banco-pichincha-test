import { ChangeEvent, useEffect, useState } from 'react';
import { Product } from '../interfaces/product.interface';
import { pluralize } from '../utils/pluralize';
import { useFilter } from './useFilter';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/product.service';

interface UseProducts {
  count: string;
  data: Product[];
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

export const useProducts = (): UseProducts => {
  const { data } = useQuery({ queryKey: ['products'], queryFn: getProducts });
  const [count, setCount] = useState<string>('');

  const { filteredData, search, setSearch } = useFilter(data || [], 'name');

  useEffect(() => {
    setCount(pluralize(data?.length || 0, 'Resultado', 'Resultados'));
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
