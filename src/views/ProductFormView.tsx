import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Product } from '../interfaces/product.interface';
import { ProductForm } from './ProductForm';
import styles from './ProductFormView.module.css';

interface Props {
  id?: Product['id'];
}

const enum FormTitle {
  CREATE = 'Formulario de Registro',
  EDIT = 'Formulario de Edición',
}

export const ProductFormView: React.FC<Props> = () => {
  const { id } = useParams();

  const [title, setTitle] = useState<FormTitle>(FormTitle.CREATE);

  useEffect(() => {
    id && setTitle(FormTitle.EDIT);
  }, [id]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <ProductForm id={id} />
    </div>
  );
};
