'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue = currentValue;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      let newValue = previousValue;

      switch (operation) {
        case '+':
          newValue = previousValue + inputValue;
          break;
        case '-':
          newValue = previousValue - inputValue;
          break;
        case '×':
          newValue = previousValue * inputValue;
          break;
        case '÷':
          newValue = previousValue / inputValue;
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const buttons = [
    { label: 'C', onClick: clear, className: 'bg-red-500 hover:bg-red-600' },
    { label: '÷', onClick: () => performOperation('÷'), className: 'bg-orange-500 hover:bg-orange-600' },
    { label: '×', onClick: () => performOperation('×'), className: 'bg-orange-500 hover:bg-orange-600' },
    { label: '-', onClick: () => performOperation('-'), className: 'bg-orange-500 hover:bg-orange-600' },
    { label: '7', onClick: () => inputDigit('7'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '8', onClick: () => inputDigit('8'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '9', onClick: () => inputDigit('9'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '+', onClick: () => performOperation('+'), className: 'bg-orange-500 hover:bg-orange-600' },
    { label: '4', onClick: () => inputDigit('4'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '5', onClick: () => inputDigit('5'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '6', onClick: () => inputDigit('6'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '=', onClick: handleEquals, className: 'bg-green-500 hover:bg-green-600 row-span-2' },
    { label: '1', onClick: () => inputDigit('1'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '2', onClick: () => inputDigit('2'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '3', onClick: () => inputDigit('3'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '0', onClick: () => inputDigit('0'), className: 'bg-gray-700 hover:bg-gray-600 col-span-2' },
    { label: '.', onClick: inputDecimal, className: 'bg-gray-700 hover:bg-gray-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <div className="bg-gray-900 rounded-lg p-6 mb-6 text-right">
          <div className="text-5xl font-light text-white break-all">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`${button.className} text-white text-2xl font-semibold rounded-xl py-5 transition-all duration-150 active:scale-95 shadow-lg`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

