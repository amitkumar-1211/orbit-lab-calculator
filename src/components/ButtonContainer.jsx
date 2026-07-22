import React from 'react';
import styles from './ButtonContainer.module.css';

const ButtonContainer = ({ onButtonClick }) => {
  const buttonLayout = [
    { label: 'C', type: 'control' },
    { label: '⌫', type: 'control' },
    { label: '%', type: 'operator' },
    { label: '/', type: 'operator' },

    { label: '7', type: 'number' },
    { label: '8', type: 'number' },
    { label: '9', type: 'number' },
    { label: '*', type: 'operator' },

    { label: '4', type: 'number' },
    { label: '5', type: 'number' },
    { label: '6', type: 'number' },
    { label: '-', type: 'operator' },

    { label: '1', type: 'number' },
    { label: '2', type: 'number' },
    { label: '3', type: 'number' },
    { label: '+', type: 'operator' },

    { label: '0', type: 'number' },
    { label: '.', type: 'number' },
    { label: '=', type: 'equals' },
  ];

  return (
    <div className={styles.buttonGrid}>
      {buttonLayout.map((btn) => (
        <button
          key={btn.label}
          className={`${styles.button} ${styles[btn.type]}`}
          onClick={() => onButtonClick(btn.label)}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonContainer;