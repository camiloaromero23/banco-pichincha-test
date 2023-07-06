import cx from 'classnames';
import { Button } from '../components';
import { formFields } from '../constants/tableKeys.constant';
import { useCreateEditProduct } from '../hooks/useCreateEditProduct';
import styles from './ProductForm.module.css';
import { Product } from '../interfaces/product.interface';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Props {
  id?: string;
}

interface InputProps {
  keyValue: keyof typeof formFields;
  errors: FieldErrors<Product>;
  onBlur?: () => Promise<void>;
  register: UseFormRegister<Product>;
  label: string;
  disabled: boolean;
  type: string;
}

const FormInput: React.FC<InputProps> = ({
  type,
  label,
  errors,
  disabled,
  register,
  onBlur,
  keyValue,
}) => {
  return (
    <input
      className={cx(styles.input, {
        [styles.error]: errors[keyValue],
      })}
      {...register(keyValue)}
      placeholder={label}
      disabled={disabled}
      onBlur={async () => {
        onBlur && (await onBlur());
      }}
      type={type}
    />
  );
};

export const ProductForm: React.FC<Props> = ({ id }) => {
  const {
    errors,
    handleReset,
    handleIdValidation,
    handleSubmit,
    isValid,
    register,
  } = useCreateEditProduct(id);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* {JSON.stringify(errors)} */}
      {Object.entries(formFields).map(([key, value]) => {
        const { label, disabled, type } = value;
        const keyString = key as keyof typeof formFields;

        const isIdField = keyString === 'id';

        return (
          <div className={styles.formField} key={key}>
            <label htmlFor={key}>{label}</label>
            {isIdField ? (
              <FormInput
                keyValue={keyString}
                type={type}
                label={label}
                disabled={disabled || (!!id && isIdField)}
                errors={errors}
                register={register}
                onBlur={handleIdValidation}
              />
            ) : (
              <FormInput
                keyValue={keyString}
                type={type}
                label={label}
                errors={errors}
                disabled={!!disabled}
                register={register}
              />
            )}
            <p className={styles.formFieldError}>
              {errors[keyString]?.message}
            </p>
          </div>
        );
      })}

      <div className={styles.buttonsContainer}>
        <Button type="submit" variant="secondary" onClick={handleReset}>
          Reiniciar
        </Button>
        <Button type="submit" disabled={!isValid}>
          Enviar
        </Button>
      </div>
    </form>
  );
};
