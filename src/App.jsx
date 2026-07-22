import { useState, useEffect } from 'react';
import styles from './App.module.css';
import ButtonContainer from './components/ButtonContainer';
import Display from './components/Display';
import ThemeSelector from './components/ThemeSelector';
import { themes } from './themes';

function App() {
  const [calVal, setCalVal] = useState('');
  const [formula, setFormula] = useState('');
  const [activeThemeId, setActiveThemeId] = useState(() => {
    return localStorage.getItem('calculator_theme') || 'midnight-cyber';
  });

  const activeTheme = themes.find((t) => t.id === activeThemeId) || themes[0];

  useEffect(() => {
    localStorage.setItem('calculator_theme', activeThemeId);
  }, [activeThemeId]);

  const onButtonClick = (buttonText) => {
    if (buttonText === 'C') {
      setCalVal('');
      setFormula('');
    } else if (buttonText === '⌫') {
      if (calVal === 'Error') {
        setCalVal('');
      } else {
        setCalVal((prev) => prev.slice(0, -1));
      }
    } else if (buttonText === '=') {
      if (!calVal || calVal === 'Error') return;
      try {
        setFormula(calVal + ' =');
        // Replace % with /100 for evaluation if appropriate or safe eval
        let expr = calVal.replace(/%/g, '/100');
        // Evaluate mathematical expression safely
        const result = Function(`"use strict"; return (${expr})`)();
        if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
          setCalVal(String(Number(result.toFixed(8))));
        } else {
          setCalVal('Error');
        }
      } catch (err) {
        setCalVal('Error');
      }
    } else {
      if (calVal === 'Error') {
        setCalVal(buttonText);
      } else {
        setCalVal((prev) => prev + buttonText);
      }
    }
  };

  return (
    <div
      className={styles.appWrapper}
      style={activeTheme.colors}
    >
      <div className={styles.container}>
        <ThemeSelector
          themes={themes}
          activeThemeId={activeThemeId}
          onSelectTheme={setActiveThemeId}
        />

        <div className={styles.calculatorCard}>
          <div className={styles.header}>
            <div className={styles.title}>CALCULATOR</div>
            <div className={styles.themeBadge}>{activeTheme.name}</div>
          </div>
          <Display displayValue={calVal} formula={formula} />
          <ButtonContainer onButtonClick={onButtonClick} />
        </div>
      </div>
    </div>
  );
}

export default App;
