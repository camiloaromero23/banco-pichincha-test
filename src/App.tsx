import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ListProductsView } from './views/ListProductsView';
import { ProductFormView } from './views/ProductFormView';
import styles from './App.module.css';
import logoPichincha from '/pichincha-logo.png';

export const App = () => {
  const router = createBrowserRouter([
    { path: '/', element: <ListProductsView /> },
    { path: '/product', element: <ProductFormView /> },
    { path: '/product/:id', element: <ProductFormView /> },
  ]);

  return (
    <>
      <header className={styles.header}>
        <img className={styles.logo} src={logoPichincha} alt="Banco Pichincha" />
      </header>
      <main className={styles.main}>
        <RouterProvider router={router} />
      </main>
    </>
  );
};

export default App;
