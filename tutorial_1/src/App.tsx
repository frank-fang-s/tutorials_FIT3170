import { useState } from 'react';

// --- Pure Math Functions ---
export function add(a: number, b: number): number { return a + b; }
export function subtract(a: number, b: number): number { return a - b; }
export function multiply(a: number, b: number): number { return a * b; }
export function divide(a: number, b: number): number | string {
  if (b === 0) return 'Error';
  return a / b;
}

// Helper to round to 7 decimal places and strip trailing zeros
function formatResult(val: number | string): number | string {
  if (typeof val === 'number') {
    return parseFloat(val.toFixed(7));
  }
  return val; // Returns 'Error' directly if division by zero
}

// --- UI Component ---
export default function App() {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [result, setResult] = useState<number | string>('');

  function handleCalculate(type: string) {
    const a = Number(num1);
    const b = Number(num2);

    if (type === 'add') setResult(formatResult(add(a, b)));
    if (type === 'subtract') setResult(formatResult(subtract(a, b)));
    if (type === 'multiply') setResult(formatResult(multiply(a, b)));
    if (type === 'divide') setResult(formatResult(divide(a, b)));
  }

  // Tailwind helper variables
  const inputStyles = "w-full p-4 border border-gray-300 rounded-xl text-xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800";
  const btnStyles = "p-4 bg-blue-500 text-white text-3xl font-medium rounded-xl hover:bg-blue-600 transition-colors active:scale-95 shadow-sm";

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Calculator</h2>

          {/* Inputs */}
          <div className="flex gap-4 mb-6">
            <input
                type="number"
                className={inputStyles}
                placeholder="0"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
            />
            <input
                type="number"
                className={inputStyles}
                placeholder="0"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
            />
          </div>

          {/* Operation Buttons */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <button className={btnStyles} onClick={() => handleCalculate('add')}>+</button>
            <button className={btnStyles} onClick={() => handleCalculate('subtract')}>-</button>
            <button className={btnStyles} onClick={() => handleCalculate('multiply')}>×</button>
            <button className={btnStyles} onClick={() => handleCalculate('divide')}>÷</button>
          </div>

          {/* Result Display */}
          <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl text-center shadow-inner">
            <label className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Result</label>
            <div className="text-5xl font-bold text-gray-800 mt-2 tracking-tight">
              {result !== '' ? result : '0'}
            </div>
          </div>

        </div>
      </div>
  );
}