import styles from './Display.module.css';
const Display = ({displayValue}) => {
  return (
    <input 
    className={styles.displayText} 
    type="text"
    value={displayValue}
    readOnly
     />
  );
}

export default Display;