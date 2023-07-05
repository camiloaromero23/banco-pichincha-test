import React from 'react';
import { Product } from '../interfaces/product.interface';
import { useParams } from 'react-router-dom';

interface Props {
  id?: Product['id'];
}

export const ProductFormView: React.FC<Props> = () => {
  const { id } = useParams();
  if (!id) {
    return (
      <div>
        <h1>ProductFormView</h1>
        Creando...
      </div>
    );
  }

  return (
    <div>
      <h1>ProductFormView</h1>
      Editando {id}...
    </div>
  );
};
