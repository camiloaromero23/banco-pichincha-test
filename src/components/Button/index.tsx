import React from 'react';
import cx from 'classnames';

import styles from './Button.module.css';

export const enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
}

interface Props {
  children?: React.ReactNode;
  variant?: keyof typeof ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export const Button: React.FC<Props> = ({
  children,
  disabled,
  onClick,
  variant = ButtonVariant.primary,
  type = 'button',
}) => {

  const handleClick = () => {
    if (disabled) {
      return;
    }
    onClick && onClick();
  };

  return (
    <button
      className={cx(styles.button, {
        [styles.secondary]: variant === ButtonVariant.secondary,
        [styles.disabled]: disabled,
      })}
      onClick={handleClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
