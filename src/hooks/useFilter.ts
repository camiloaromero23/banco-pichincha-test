import { useEffect, useState } from 'react';

interface UseFilter<T> {
  filteredData: T[];
  search: string;
  setSearch: (search: string) => void;
}

export const useFilter = <T>(data: T[], field: keyof T): UseFilter<T> => {
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (data.length === 0) {
      return;
    }

    if (search === '') {
      return setFilteredData(data);
    }

    const dataAfterFilter = data.filter((item) => {
      return (item[field] as string)
        .toLowerCase()
        .includes(search.toLowerCase());
    });
    setFilteredData(dataAfterFilter);
  }, [data, field, search]);

  return { filteredData, search, setSearch };
};
