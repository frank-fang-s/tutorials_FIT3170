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
        result = currentValue === 0 ? 0 : previousValue / currentValue;
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

  // Helper variables for button styles to keep the JSX clean
  const btnBase = "p-4 text-2xl font-medium rounded-xl transition-all duration-150 active:scale-95";
  const btnNum = `${btnBase} bg-gray-700 text-white hover:bg-gray-600`;
  const btnOp = `${btnBase} bg-orange-500 text-white hover:bg-orange-400`;

  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans p-4">
        <div className="w-80 bg-gray-900 p-6 rounded-3xl shadow-2xl">

          {/* Calculator Display */}
          <div className="bg-gray-800 text-white text-5xl p-5 text-right rounded-2xl mb-6 overflow-hidden tracking-wider shadow-inner font-light">
            {display}
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-3">
            <button
                className={`${btnBase} col-span-4 bg-red-500 hover:bg-red-400 text-white font-bold tracking-widest uppercase text-lg`}
                onClick={handleClear}
            >
              Clear
            </button>

            <button className={btnNum} onClick={() => handleNumber('7')}>7</button>
            <button className={btnNum} onClick={() => handleNumber('8')}>8</button>
            <button className={btnNum} onClick={() => handleNumber('9')}>9</button>
            <button className={btnOp} onClick={() => handleOperator('/')}>÷</button>

            <button className={btnNum} onClick={() => handleNumber('4')}>4</button>
            <button className={btnNum} onClick={() => handleNumber('5')}>5</button>
            <button className={btnNum} onClick={() => handleNumber('6')}>6</button>
            <button className={btnOp} onClick={() => handleOperator('*')}>×</button>

            <button className={btnNum} onClick={() => handleNumber('1')}>1</button>
            <button className={btnNum} onClick={() => handleNumber('2')}>2</button>
            <button className={btnNum} onClick={() => handleNumber('3')}>3</button>
            <button className={btnOp} onClick={() => handleOperator('-')}>−</button>

            <button className={`${btnNum} col-span-2`} onClick={() => handleNumber('0')}>0</button>
            <button className={btnNum} onClick={() => handleNumber('.')}>.</button>
            <button className={btnOp} onClick={() => handleOperator('+')}>+</button>

            <button className={`${btnOp} col-span-4`} onClick={calculate}>=</button>
          </div>

        </div>
      </div>
  );
}