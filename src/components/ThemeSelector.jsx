import React from 'react';
import styles from './ThemeSelector.module.css';

const ThemeSelector = ({ themes, activeThemeId, onSelectTheme }) => {
  return (
    <div className={styles.themeSelectorContainer}>
      <div className={styles.label}>Select Theme:</div>
      <div className={styles.pillGroup}>
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={`${styles.themePill} ${
              activeThemeId === theme.id ? styles.activePill : ''
            }`}
            onClick={() => onSelectTheme(theme.id)}
            title={theme.name}
          >
            <span className={styles.icon}>{theme.icon}</span>
            <span className={styles.name}>{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
