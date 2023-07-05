import React from 'react';
import styles from './Input.module.css';

interface Props {
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<Props> = ({ onChange, placeholder, value }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={styles.input}
      value={value}
      onChange={onChange}
    />
  );
};
