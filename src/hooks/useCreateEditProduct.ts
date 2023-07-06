import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useProducts } from './useProducts';
import { useNavigation } from './useNavigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '../interfaces/product.interface';
import { postProduct, verifyProductId } from '../services/product.service';

const schema = z.object({
  date_release: z.coerce
    .date({
      invalid_type_error: 'La fecha debe ser válida',
      required_error: 'La fecha es requerida',
    })
    .min(
      new Date(new Date().setDate(new Date().getDate() - 2)),
      'La fecha debe ser mayor o igual a hoy',
    ),
  date_revision: z.coerce.date().optional(),
  description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(200, 'La descripción no puede tener más de 200 caracteres')
    .nonempty('La descripción es requerida'),
  id: z
    .string()
    .nonempty('El id es requerido')
    .min(3, 'El ID debe tener al menos 3 caracteres')
    .max(10, 'El ID no puede tener más de 10 caracteres'),
  logo: z.string().nonempty('El logo es requerido'),
  name: z
    .string()
    .nonempty('El nombre es requerido')
    .min(5, 'El nombre debe tener al menos 5 caracteres')
    .max(100, 'El nombre no puede tener más de 100 caracteres'),
});

export const useCreateEditProduct = (id = '') => {
  const { data } = useProducts();
  const { handleNavigate } = useNavigation();
  const queryClient = useQueryClient();
  const [isValidId, setIsValidId] = useState(!!id);

  const { mutateAsync } = useMutation({
    mutationFn: postProduct,
    onSuccess: (data) => {
      queryClient.setQueriesData(['products', { id }], data);
      handleNavigate('/');
    },
  });

  const {
    clearErrors,
    formState: { errors, isValid, touchedFields },
    getValues,
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    watch,
  } = useForm<Product>({
    resolver: zodResolver(schema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      id: '',
      logo: '',
      name: '',
      date_release: '',
      date_revision: '',
      description: '',
    },
  });

  const watchDateRelease = watch('date_release');

  useEffect(() => {
    if (watchDateRelease) {
      const dateValues = watchDateRelease.split('-');
      const newDateNextYear = Number(dateValues[0]) + 1;
      const newDate = `${newDateNextYear}-${dateValues[1]}-${dateValues[2]}`;
      setValue('date_revision', newDate);
    }
  }, [watchDateRelease]);

  useEffect(() => {
    if (id) {
      const product = data.find((product) => product.id === id);
      if (!product) {
        return;
      }

      const dateRelease = new Date(product.date_release);
      const dateRevision = new Date(product.date_revision);

      reset({
        ...product,
        date_release: dateRelease.toISOString().split('T')[0],
        date_revision: dateRevision.toISOString().split('T')[0],
      });
    }
  }, [id, data]);

  const handleReset = () => {
    reset();
  };

  const handleFormSubmit = handleSubmit(async (data) => {
    const date_release = new Date(data.date_release)
      .toISOString()
      .split('T')[0];
    const date_revision = new Date(data.date_revision)
      .toISOString()
      .split('T')[0];

    const product = {
      ...data,
      date_release,
      date_revision,
    };

    if (id) {
      await mutateAsync({ product, id });
      handleNavigate('/');
      return;
    }
    await mutateAsync({ product });
    handleNavigate('/');
  });

  const handleIdValidation = async () => {
    const exists = await verifyProductId(getValues('id'));

    if (!exists) {
      setIsValidId(true);
      clearErrors('id');
      return;
    }

    setIsValidId(false);
    setError('id', {
      type: 'manual',
      message: 'El ID ya existe',
    });
  };

  return {
    register,
    handleSubmit: handleFormSubmit,
    errors,
    isValid: isValid && isValidId,
    handleIdValidation,
    handleReset,
    touchedFields,
  };
};
