import React from 'react';

import defaultLogo from '../../assets/default-logo.svg';
import { tableKeys } from '../../constants/tableKeys.constant';
import { Product } from '../../interfaces/product.interface';
import { formatDate } from '../../utils/date';
import { InfoIcon } from './InfoIcon';

import styles from './Table.module.css';
import { Dropdown } from '..';
import { useNavigation } from '../../hooks/useNavigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../../services/product.service';

interface Props {
  data: Product[];
}

export const Table: React.FC<Props> = ({ data }) => {
  const { handleNavigate } = useNavigation();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
    onMutate: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  if (!data.length) {
    return <p>No hay datos</p>;
  }

  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr className={styles.tableRow}>
          {Object.entries(tableKeys).map(([key, item], index) => {
            if (['name', 'logo'].includes(key)) {
              return <th key={`${item}-${index}`}>{item}</th>;
            }
            return (
              <th key={`${item}-${index}`}>
                <span className={styles.tableHeaderContainer}>
                  {item}
                  <div className={styles.infoIconContainer}>
                    <InfoIcon fill="#959798" />
                  </div>
                </span>
              </th>
            );
          })}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className={styles.tableRow}>
            <td>
              <img
                src={item.logo}
                className={styles.logo}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = defaultLogo;
                }}
              />
            </td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{formatDate(item.date_release)}</td>
            <td>{formatDate(item.date_revision)}</td>
            <td className={styles.tableRow}>
              <Dropdown
                actions={[
                  {
                    label: 'Editar',
                    onClick: () => {
                      handleNavigate(`/product/${item.id}`);
                    },
                  },
                  {
                    label: 'Eliminar',
                    onClick: () => mutateAsync(item.id),
                  },
                ]}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
