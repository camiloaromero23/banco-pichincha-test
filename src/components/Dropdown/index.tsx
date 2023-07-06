import { useState } from 'react';
import cx from 'classnames';

import styles from './Dropdown.module.css';
import dots from '../../assets/dots.svg';

interface Action {
  label: string;
  onClick: () => void;
}

interface Props {
  actions: Action[];
}
export const Dropdown: React.FC<Props> = ({ actions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleClick = (onClick: () => void) => {
    setIsOpen(false);
    onClick();
  };
  return (
    <>
      <img src={dots} className={styles.options} onClick={handleToggle} />

      <li className={cx(styles.dropdown, { [styles.open]: isOpen })}>
        {actions.map((action, index) => (
          <ul
            className={styles.dropdownItem}
            key={`${index}-${action}`}
            onClick={() => {
              handleClick(action.onClick);
            }}
          >
            {action.label}
          </ul>
        ))}
      </li>
    </>
  );
};
