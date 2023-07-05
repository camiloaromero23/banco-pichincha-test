import { useEffect, useState } from "react";

interface UseFilter<T> {
  filteredData: T[];
  search: string;
  setSearch: (search: string) => void;
}

export const useFilter = <T>(data: T[], field: keyof T): UseFilter<T> => {
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const dataAfterFilter = data.filter((item) => {
      return (item[field] as string).toLowerCase().includes(search.toLowerCase());
    });
    setFilteredData(dataAfterFilter);
  }, [data, field, search]);

  return { filteredData, search, setSearch };
}
