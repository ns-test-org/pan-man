'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumberClick = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperationClick = (op: string) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = performCalculation(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const performCalculation = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = performCalculation(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const Button = ({ children, onClick, className = '', variant = 'default' }: any) => {
    const baseClass = 'h-16 rounded-xl font-semibold text-xl transition-all active:scale-95';
    const variants = {
      default: 'bg-gray-700 hover:bg-gray-600 text-white',
      operation: 'bg-orange-500 hover:bg-orange-600 text-white',
      clear: 'bg-gray-500 hover:bg-gray-400 text-white',
      equals: 'bg-green-500 hover:bg-green-600 text-white'
    };
    
    return (
      <button
        onClick={onClick}
        className={`${baseClass} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-3xl shadow-2xl p-6 border border-gray-700">
        {/* Display */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-700">
          <div className="text-right text-5xl font-bold text-white break-all">
            {display}
          </div>
          {operation && (
            <div className="text-right text-sm text-gray-400 mt-2">
              {previousValue} {operation}
            </div>
          )}
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button onClick={handleClear} variant="clear" className="col-span-2">
            AC
          </Button>
          <Button onClick={handleBackspace} variant="clear">
            ⌫
          </Button>
          <Button onClick={() => handleOperationClick('÷')} variant="operation">
            ÷
          </Button>

          {/* Row 2 */}
          <Button onClick={() => handleNumberClick('7')}>7</Button>
          <Button onClick={() => handleNumberClick('8')}>8</Button>
          <Button onClick={() => handleNumberClick('9')}>9</Button>
          <Button onClick={() => handleOperationClick('×')} variant="operation">
            ×
          </Button>

          {/* Row 3 */}
          <Button onClick={() => handleNumberClick('4')}>4</Button>
          <Button onClick={() => handleNumberClick('5')}>5</Button>
          <Button onClick={() => handleNumberClick('6')}>6</Button>
          <Button onClick={() => handleOperationClick('-')} variant="operation">
            −
          </Button>

          {/* Row 4 */}
          <Button onClick={() => handleNumberClick('1')}>1</Button>
          <Button onClick={() => handleNumberClick('2')}>2</Button>
          <Button onClick={() => handleNumberClick('3')}>3</Button>
          <Button onClick={() => handleOperationClick('+')} variant="operation">
            +
          </Button>

          {/* Row 5 */}
          <Button onClick={() => handleNumberClick('0')} className="col-span-2">
            0
          </Button>
          <Button onClick={handleDecimal}>.</Button>
          <Button onClick={handleEquals} variant="equals">
            =
          </Button>
        </div>
      </div>
    </div>
  );
}

