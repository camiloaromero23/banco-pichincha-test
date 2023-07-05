import cx from 'classnames';

import { Button, Input, Table } from '../components';
import { useData } from '../hooks/useData';

import styles from './ListProductsView.module.css';
import { useAddProduct } from '../hooks/useAddProduct';

export const ListProductsView = () => {
  const { data, count, search, handleSearchChange } = useData();

  const { handleAddClick } = useAddProduct();

  return (
    <>
      <div className={cx(styles.container, styles.toolsContainer)}>
        <Input placeholder="Search..." value={search} onChange={handleSearchChange} />
        <Button onClick={handleAddClick}>Agregar</Button>
      </div>
      <div className={cx(styles.container, styles.tableContainer)}>
        <Table data={data} />
        <div className={styles.countContainer}>{count}</div>
      </div>
    </>
  );
};
