import { useState } from 'react';

export default function App() {
  const [display, setDisplay] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState<boolean>(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    // If we already have an operator and aren't just changing our minds
    if (operator && !waitingForNewValue) {
      calculate();
    } else {
      setPreviousValue(parseFloat(display));
    }

    setOperator(op);
    setWaitingForNewValue(true);
  };

  const calculate = () => {
    if (previousValue === null || operator === null || waitingForNewValue) return;

    const currentValue = parseFloat(display);
    let result = 0;

    switch (operator) {
      case '+': result = previousValue + currentValue; break;
      case '-': result = previousValue - currentValue; break;
      case '*': result = previousValue * currentValue; break;
      case '/':
        result = currentValue === 0 ? 0 : previousValue / currentValue; // Prevent Infinity
        break;
      default: return;
    }

    setDisplay(String(result));
    setPreviousValue(result);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  // --- Simple Inline Styles ---
  const styles = {
    container: { display: 'flex', justifyContent: 'center', marginTop: '50px', fontFamily: 'sans-serif' },
    calculator: { width: '300px', backgroundColor: '#222', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' },
    display: { backgroundColor: '#333', color: '#fff', fontSize: '2rem', padding: '15px', textAlign: 'right' as const, borderRadius: '5px', marginBottom: '15px', overflow: 'hidden' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' },
    btn: { padding: '15px', fontSize: '1.2rem', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: '#444', color: '#fff' },
    btnOp: { backgroundColor: '#f39c12', color: '#fff' },
    btnZero: { gridColumn: 'span 2' },
    btnClear: { gridColumn: 'span 4', backgroundColor: '#e74c3c' }
  };

  return (
      <div style={styles.container}>
        <div style={styles.calculator}>
          <div style={styles.display}>
            {display}
          </div>

          <div style={styles.grid}>
            <button style={{...styles.btn, ...styles.btnClear}} onClick={handleClear}>Clear</button>

            <button style={styles.btn} onClick={() => handleNumber('7')}>7</button>
            <button style={styles.btn} onClick={() => handleNumber('8')}>8</button>
            <button style={styles.btn} onClick={() => handleNumber('9')}>9</button>
            <button style={{...styles.btn, ...styles.btnOp}} onClick={() => handleOperator('/')}>÷</button>

            <button style={styles.btn} onClick={() => handleNumber('4')}>4</button>
            <button style={styles.btn} onClick={() => handleNumber('5')}>5</button>
            <button style={styles.btn} onClick={() => handleNumber('6')}>6</button>
            <button style={{...styles.btn, ...styles.btnOp}} onClick={() => handleOperator('*')}>×</button>

            <button style={styles.btn} onClick={() => handleNumber('1')}>1</button>
            <button style={styles.btn} onClick={() => handleNumber('2')}>2</button>
            <button style={styles.btn} onClick={() => handleNumber('3')}>3</button>
            <button style={{...styles.btn, ...styles.btnOp}} onClick={() => handleOperator('-')}>-</button>

            <button style={{...styles.btn, ...styles.btnZero}} onClick={() => handleNumber('0')}>0</button>
            <button style={styles.btn} onClick={() => handleNumber('.')}>.</button>
            <button style={{...styles.btn, ...styles.btnOp}} onClick={() => handleOperator('+')}>+</button>

            <button style={{...styles.btn, ...styles.btnOp, gridColumn: 'span 4'}} onClick={calculate}>=</button>
          </div>
        </div>
      </div>
  );
}