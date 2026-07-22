import styles from './Display.module.css';

const Display = ({ displayValue, formula }) => {
  return (
    <div className={styles.displayContainer}>
      <div className={styles.formulaText}>{formula || '\u00A0'}</div>
      <input
        className={styles.displayText}
        type="text"
        value={displayValue || '0'}
        readOnly
      />
    </div>
  );
};

export default Display;