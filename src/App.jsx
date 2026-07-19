import { useState } from 'react';
import styles from './App.module.css';
import ButtonContainer from './components/ButtonContainer';
import Display from './components/Display';

function App() {
  const [calVal, setCalVal] = useState('');
  const onButtonClick = (buttonText) => {
   if(buttonText =='C'){
    setCalVal('');
   }
   else if( buttonText == '⌫'){
     const deletNumber = calVal.slice(0,-1);
     setCalVal(deletNumber);
   }
   else if(buttonText == '=' ){
    const result = eval(calVal);
    setCalVal(result);
   }
   else {
    const newDisplayValue = calVal+buttonText;
    setCalVal(newDisplayValue);
   }
  };
  return (
   <center>
     <div className={styles.calculator}>
      <Display displayValue = {calVal}></Display>
      <ButtonContainer 
       onButtonClick ={onButtonClick} ></ButtonContainer>
     </div>
    </center>
  );
}

export default App;
