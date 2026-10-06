import { useEffect, useMemo, useState } from 'react';
import styles from './UnitConverter.module.css';

const unitGroups = {
  Currency: { units: ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AUD', 'CHF'], rates: { USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.1, JPY: 150.4, CAD: 1.36, AUD: 1.53, CHF: 0.89 }, note: 'Indicative rates · offline reference' },
  Length: { units: ['m', 'km', 'cm', 'mm', 'mi', 'yd', 'ft', 'in'], rates: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, yd: 0.9144, ft: 0.3048, in: 0.0254 } },
  Area: { units: ['m²', 'km²', 'cm²', 'ha', 'acre', 'ft²'], rates: { 'm²': 1, 'km²': 1e6, 'cm²': 1e-4, ha: 1e4, acre: 4046.8564, 'ft²': 0.092903 } },
  Volume: { units: ['L', 'mL', 'm³', 'gal (US)', 'qt (US)', 'cup (US)', 'ft³'], rates: { L: 1, mL: 0.001, 'm³': 1000, 'gal (US)': 3.78541, 'qt (US)': 0.946353, 'cup (US)': 0.236588, 'ft³': 28.3168 } },
  Weight: { units: ['kg', 'g', 'mg', 'lb', 'oz', 'tonne'], rates: { kg: 1, g: 0.001, mg: 1e-6, lb: 0.453592, oz: 0.0283495, tonne: 1000 } },
  Temperature: { units: ['°C', '°F', 'K'], convert: (value, from, to) => { const celsius = from === '°F' ? (value - 32) * 5 / 9 : from === 'K' ? value - 273.15 : value; return to === '°F' ? celsius * 9 / 5 + 32 : to === 'K' ? celsius + 273.15 : celsius; } },
  Speed: { units: ['m/s', 'km/h', 'mph', 'kn', 'ft/s'], rates: { 'm/s': 1, 'km/h': 1 / 3.6, mph: 0.44704, kn: 0.514444, 'ft/s': 0.3048 } },
  Pressure: { units: ['Pa', 'kPa', 'bar', 'atm', 'psi', 'mmHg'], rates: { Pa: 1, kPa: 1000, bar: 100000, atm: 101325, psi: 6894.76, mmHg: 133.322 } },
  Power: { units: ['W', 'kW', 'MW', 'hp', 'BTU/h'], rates: { W: 1, kW: 1000, MW: 1e6, hp: 745.7, 'BTU/h': 0.293071 } },
  'Number system': { units: ['Decimal', 'Binary', 'Octal', 'Hex'], radix: { Decimal: 10, Binary: 2, Octal: 8, Hex: 16 } },
};

const categoryIcons = ['◉', '↔', '▧', '◌', '◈', '℃', '⌁', '◉', 'ϟ', '01'];
const format = (number) => Number.isFinite(number) ? Number(number.toPrecision(10)).toLocaleString('en-US', { maximumFractionDigits: 8 }) : '—';

export default function UnitConverter() {
  const [category, setCategory] = useState('Currency');
  const [value, setValue] = useState('1');
  const group = unitGroups[category];
  const [from, setFrom] = useState(group.units[0]);
  const [to, setTo] = useState(group.units[1]);

  useEffect(() => {
    setFrom(group.units[0]);
    setTo(group.units[1]);
  }, [group]);

  const result = useMemo(() => {
    const number = Number(value);
    if (!Number.isFinite(number)) return '—';
    if (group.convert) return format(group.convert(number, from, to));
    if (group.radix) {
      const parsed = parseInt(value, group.radix[from]);
      return Number.isFinite(parsed) ? parsed.toString(group.radix[to]).toUpperCase() : 'Invalid input';
    }
    return format(number * group.rates[from] / group.rates[to]);
  }, [value, from, to, group]);

  return <section className={styles.converter}>
    <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>CONVERSION STUDIO</span><h2>Make it make sense.</h2></div><span className={styles.liveDot}>● READY</span></div>
    <div className={styles.categoryGrid}>{Object.keys(unitGroups).map((name, index) => <button key={name} className={`${styles.category} ${category === name ? styles.selected : ''}`} onClick={() => setCategory(name)}><span>{categoryIcons[index]}</span>{name}</button>)}</div>
    <div className={styles.convertPanel}>
      <label className={styles.fieldLabel}>YOU HAVE</label>
      <div className={styles.unitRow}><input aria-label="Value to convert" value={value} onChange={event => setValue(event.target.value)} inputMode="decimal" /><select aria-label="From unit" value={from} onChange={event => setFrom(event.target.value)}>{group.units.map(unit => <option key={unit}>{unit}</option>)}</select></div>
      <button className={styles.swap} onClick={() => { setFrom(to); setTo(from); }} aria-label="Swap units">↕</button>
      <label className={styles.fieldLabel}>YOU GET</label>
      <div className={`${styles.unitRow} ${styles.resultRow}`}><output>{result}</output><select aria-label="To unit" value={to} onChange={event => setTo(event.target.value)}>{group.units.map(unit => <option key={unit}>{unit}</option>)}</select></div>
      {group.note && <p className={styles.note}>{group.note}</p>}
    </div>
  </section>;
}
