import { Product } from '../interfaces/product.interface';
import { randomIntFromInterval } from '../utils/generateNumber';

interface IPostProduct {
  product: Product;
  id?: string;
}

const getAuthorId = () => {
  let authorId = localStorage.getItem('authorId');
  if (!authorId) {
    authorId = String(randomIntFromInterval(1, 99999999));
    localStorage.setItem('authorId', authorId);
  }
  return authorId;
}

export const postProduct = async ({
  product,
  id = '',
}: IPostProduct): Promise<Product> => {
  const authorId = getAuthorId();
  const headers = new Headers();

  headers.append('authorId', authorId);
  headers.append('Content-Type', 'application/json');
  const requestOptions = {
    method: id ? 'PUT' : 'POST',
    headers,
    body: JSON.stringify(product),
  };

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/bp/products`,
    requestOptions,
  );

  return res.json();
};

export const getProducts = async (): Promise<Product[]> => {
  const authorId = getAuthorId();
  const headers = new Headers();
  headers.append('authorId', authorId);
  const requestOptions = {
    method: 'GET',
    headers,
  };

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/bp/products`,
    requestOptions,
  );
  const data = await res.json();
  return data;
};

export const deleteProduct = async (id: string) => {
  const authorId = getAuthorId();
  const headers = new Headers();

  headers.append('authorId', authorId);
  headers.append('Content-Type', 'application/json');
  const requestOptions = {
    method: 'DELETE',
    headers,
  };
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/bp/products?id=${id}`,
    requestOptions,
  );
  return res;
};

export const verifyProductId = async (id: string) => {
  const authorId = getAuthorId();
  const headers = new Headers();

  headers.append('authorId', authorId);
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/bp/products/verification?id=${id}`,
  );
  return res.json();
};
