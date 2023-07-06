import cx from 'classnames';

import { Button, Input, Table } from '../components';
import { useProducts } from '../hooks/useProducts';

import { useNavigation } from '../hooks/useNavigation';
import styles from './ListProductsView.module.css';

export const ListProductsView = () => {
  const { data, count, search, handleSearchChange } = useProducts();

  const { handleNavigate } = useNavigation();

  const handleClick = () => handleNavigate('/product');

  return (
    <>
      <div className={cx(styles.container, styles.toolsContainer)}>
        <Input
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
        />
        <Button onClick={handleClick}>Agregar</Button>
      </div>
      <div className={cx(styles.container, styles.contentContainer)}>
        <Table data={data} />
        <div className={styles.countContainer}>{count}</div>
      </div>
    </>
  );
};
