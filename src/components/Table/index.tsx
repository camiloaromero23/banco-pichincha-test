import React from 'react';

import dots from '../../assets/dots.svg';
import { tableKeys } from '../../constants/tableKeys.constant';
import { Data, DataWithoutId } from '../../interfaces/data.interface';
import { InfoIcon } from './InfoIcon';

import styles from './Table.module.css';

interface Props {
  data: Data[];
}

export const Table: React.FC<Props> = ({ data }) => {
  if (!data.length) {
    return <p>No hay datos</p>;
  }

  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr className={styles.tableRow}>
          {Object.keys(data[0]).map((item, index) => {
            if (item === 'id') {
              return null;
            }

            if (['name', 'logo'].includes(item)) {
              return <th key={`${item}-${index}`}>{tableKeys[item as keyof DataWithoutId]}</th>;
            }
            return (
              <th key={`${item}-${index}`}>
                <span className={styles.tableHeaderContainer}>
                  {tableKeys[item as keyof DataWithoutId]}
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
            <td>{item.logo}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.date_release}</td>
            <td>{item.date_revision}</td>
            <td className={styles.tableRow}>
              <img src={dots} className={styles.options} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
