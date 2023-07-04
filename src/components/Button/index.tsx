import React from 'react';
import cx from 'classnames';

import styles from './Button.module.css';

export const enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
}

interface Props {
  children?: React.ReactNode;
  type?: keyof typeof ButtonType;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  children,
  disabled,
  onClick,
  type = ButtonType.primary,
}) => {

  const handleClick = () => {
    if (disabled) {
      return;
    }
    onClick();
  };

  return (
    <button
      className={cx(styles.button, {
        [styles.secondary]: type === ButtonType.secondary,
        [styles.disabled]: disabled,
      })}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
