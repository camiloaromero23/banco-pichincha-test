import { ChangeEvent, useEffect, useState } from 'react';
import { Product } from '../interfaces/product.interface';
import { pluralize } from '../utils/pluralize';
import { useFilter } from './useFilter';
import { useQuery } from '@tanstack/react-query';

interface UseData {
  count: string;
  data: Product[];
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

const getData = async (): Promise<Product[]> => {
  const headers = new Headers();
  //TODO: Handle authorId
  const authorId = '1';
  headers.append('authorId', authorId);
  const requestOptions = {
    method: 'GET',
    headers,
    redirect: 'follow' as RequestRedirect,
  };

  const res = await fetch(`${import.meta.env.VITE_API_URL}/bp/products`, requestOptions);
  const data = await res.json();
  return data;
};

export const useData = (): UseData => {
  const { data } = useQuery({ queryKey: ['products'], queryFn: getData });

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
