import { useEffect, useState } from 'react';
import styles from './App.module.css';
import ButtonContainer from './components/ButtonContainer';
import Display from './components/Display';
import ThemeSelector from './components/ThemeSelector';
import UnitConverter from './components/UnitConverter';
import { themes } from './themes';

function App() {
  const [calVal, setCalVal] = useState('');
  const [formula, setFormula] = useState('');
  const [activeThemeId, setActiveThemeId] = useState(() => localStorage.getItem('calculator_theme') || 'midnight-cyber');
  const [view, setView] = useState('calculator');
  const activeTheme = themes.find(t => t.id === activeThemeId) || themes[0];
  useEffect(() => { localStorage.setItem('calculator_theme', activeThemeId); }, [activeThemeId]);

  const onButtonClick = (buttonText) => {
    if (buttonText === 'C') { setCalVal(''); setFormula(''); return; }
    if (buttonText === '⌫') { setCalVal(prev => prev === 'Error' ? '' : prev.slice(0, -1)); return; }
    if (buttonText === '=') {
      if (!calVal || calVal === 'Error') return;
      try {
        const expression = calVal.replace(/π/g, 'Math.PI').replace(/√\(/g, 'Math.sqrt(').replace(/sin\(/g, 'Math.sin(Math.PI/180*').replace(/cos\(/g, 'Math.cos(Math.PI/180*').replace(/tan\(/g, 'Math.tan(Math.PI/180*').replace(/log\(/g, 'Math.log10(').replace(/ln\(/g, 'Math.log(').replace(/%/g, '/100');
        const result = Function(`"use strict"; return (${expression})`)();
        setFormula(`${calVal} =`);
        setCalVal(Number.isFinite(result) ? String(Number(result.toPrecision(10))) : 'Error');
      } catch { setCalVal('Error'); }
      return;
    }
    setCalVal(prev => prev === 'Error' ? buttonText : prev + buttonText);
  };

  return <main className={styles.appWrapper} style={activeTheme.colors}>
    <div className={styles.container}>
      <header className={styles.topbar}><a className={styles.brand} href="#home"><span className={styles.brandIcon}>✳</span><span>orbit<span className={styles.brandLight}>.lab</span></span></a><div className={styles.topRight}><span className={styles.status}><i /> ALL SYSTEMS READY</span><ThemeSelector themes={themes} activeThemeId={activeThemeId} onSelectTheme={setActiveThemeId} /></div></header>
      <section className={styles.hero}><div><div className={styles.kicker}><span /> YOUR EVERYDAY NUMBER SPACE</div><h1>Numbers, in<br /><em>their element.</em></h1><p className={styles.intro}>A little math magic for whatever you’re figuring out.</p></div><div className={styles.orb}><span>π</span><i>✳</i></div></section>
      <nav className={styles.tabs} aria-label="Calculator tools"><button onClick={() => setView('calculator')} className={view === 'calculator' ? styles.activeTab : ''}>⌗ <span>Calculator</span></button><button onClick={() => setView('convert')} className={view === 'convert' ? styles.activeTab : ''}>↔ <span>Convert</span></button><span className={styles.tabsHint}>01 / 02</span></nav>
      {view === 'calculator' ? <div className={styles.workspace}>
        <section className={styles.calculatorCard}><div className={styles.cardHeader}><div><span className={styles.eyebrow}>STANDARD · SCIENTIFIC</span><h2>Quick calculate</h2></div><span className={styles.cardMark}>✳</span></div><Display displayValue={calVal} formula={formula} /><div className={styles.scientificRow}>{['sin(', 'cos(', 'tan(', 'log(', 'ln(', '√(', 'π', 'x²'].map(x => <button key={x} onClick={() => onButtonClick(x === 'x²' ? '**2' : x)}>{x}</button>)}</div><ButtonContainer onButtonClick={onButtonClick} /></section>
        <aside className={styles.sideNote}><div className={styles.noteGlyph}>✳</div><span className={styles.eyebrow}>A FASTER WAY</span><h3>Small buttons.<br />Big brain energy.</h3><p>Everyday arithmetic, plus the scientific essentials, all on one calm little canvas.</p><div className={styles.shortcut}><span>TIP</span> Tap <b>π</b> or <b>√</b> to add it to your expression.</div><div className={styles.sideFoot}>BUILT FOR THE CURIOUS <span>↗</span></div></aside>
      </div> : <UnitConverter />}
      <footer className={styles.footer}><span>✳ &nbsp; A CLEARER WAY TO COUNT.</span><span>ORBIT LAB &nbsp;·&nbsp; EST. 2025</span></footer>
    </div>
  </main>;
}
export default App;
