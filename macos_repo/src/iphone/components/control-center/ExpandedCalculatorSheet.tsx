import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, X } from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

interface Props {
  onClose: () => void;
}

export const ExpandedCalculatorSheet: React.FC<Props> = ({ onClose }) => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [clearOnNext, setClearOnNext] = useState(false);

  const handleDigit = (digit: string) => {
    sound.tap();
    if (display === '0' || clearOnNext) {
      setDisplay(digit);
      setClearOnNext(false);
    } else {
      if (display.length < 9) {
        setDisplay(display + digit);
      }
    }
  };

  const handleDecimal = () => {
    sound.tap();
    if (clearOnNext) {
      setDisplay('0.');
      setClearOnNext(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOp = (op: string) => {
    sound.tap();
    const curr = parseFloat(display);
    if (prevValue !== null && operator && !clearOnNext) {
      calculate();
    } else {
      setPrevValue(curr);
    }
    setOperator(op);
    setClearOnNext(true);
  };

  const calculate = () => {
    sound.tap();
    if (prevValue === null || !operator) return;
    const curr = parseFloat(display);
    let result = 0;
    switch (operator) {
      case '+':
        result = prevValue + curr;
        break;
      case '−':
        result = prevValue - curr;
        break;
      case '×':
        result = prevValue * curr;
        break;
      case '÷':
        result = curr !== 0 ? prevValue / curr : 0;
        break;
    }
    const formatted = parseFloat(result.toFixed(6)).toString();
    setDisplay(formatted);
    setPrevValue(null);
    setOperator(null);
    setClearOnNext(true);
  };

  const clearAll = () => {
    sound.tap();
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setClearOnNext(false);
  };

  const toggleSign = () => {
    sound.tap();
    const val = parseFloat(display);
    setDisplay((-val).toString());
  };

  const handlePercent = () => {
    sound.tap();
    const val = parseFloat(display);
    setDisplay((val / 100).toString());
  };

  return (
    <motion.div
      initial={{ scale: 0.88, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.88, opacity: 0, y: 30 }}
      transition={{ type: 'spring', damping: 28, stiffness: 340 }}
      className="w-full max-w-[300px] rounded-[34px] bg-zinc-950/95 backdrop-blur-3xl border border-white/20 shadow-2xl p-4 text-white select-none relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="w-full flex items-center justify-between pb-2 border-b border-white/10 mb-2">
        <div className="flex items-center gap-1.5">
          <Calculator className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Calculator</span>
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Screen */}
      <div className="text-right text-3xl font-light font-mono px-2 py-3 truncate tracking-tight text-white mb-2">
        {display}
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-2">
        {/* Row 1 */}
        <button onClick={clearAll} className="h-11 rounded-full bg-zinc-700/80 hover:bg-zinc-600 text-white font-semibold text-xs active:scale-95 transition-all">
          AC
        </button>
        <button onClick={toggleSign} className="h-11 rounded-full bg-zinc-700/80 hover:bg-zinc-600 text-white font-semibold text-xs active:scale-95 transition-all">
          ±
        </button>
        <button onClick={handlePercent} className="h-11 rounded-full bg-zinc-700/80 hover:bg-zinc-600 text-white font-semibold text-xs active:scale-95 transition-all">
          %
        </button>
        <button onClick={() => handleOp('÷')} className={`h-11 rounded-full font-bold text-sm active:scale-95 transition-all ${operator === '÷' ? 'bg-white text-amber-500' : 'bg-amber-500 hover:bg-amber-400 text-white'}`}>
          ÷
        </button>

        {/* Row 2 */}
        <button onClick={() => handleDigit('7')} className="h-11 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm active:scale-95 transition-all">
          7
        </button>
        <button onClick={() => handleDigit('8')} className="h-11 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm active:scale-95 transition-all">
          8
        </button>
        <button onClick={() => handleDigit('9')} className="h-11 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm active:scale-95 transition-all">
          9
        </button>
        <button onClick={() => handleOp('×')} className={`h-11 rounded-full font-bold text-sm active:scale-95 transition-all ${operator === '×' ? 'bg-white text-amber-500' : 'bg-amber-500 hover:bg-amber-400 text-white'}`}>
          ×
        </button>

        {/* Row 3 */}
        <button onClick={() => handleDigit('4')} className="h-11 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm active:scale-95 transition-all">
          4
        </button>
        <button onClick={() => handleDigit('5')} className="h-11 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm active:scale-95 transition-all">
          5
        </button>
        <button onClick={() => handleDigit('6')} className="h-11 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm active:scale-95 transition-all">
          6
        </button>
        <button onClick={() => handleOp('−')} className={`h-11 rounded-full font-bold text-sm active:scale-95 transition-all ${operator === '−' ? 'bg-white text-amber-500' : 'bg-amber-500 hover:bg-amber-400 text-white'}`}>
          −
        </button>

        {/* Row 4 */}
        <button onClick={() => handleDigit('1')} className="h-11 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm active:scale-95 transition-all">
          1
        </button>
        <button onClick={() => handleDigit('2')} className="h-11 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm active:scale-95 transition-all">
          2
        </button>
        <button onClick={() => handleDigit('3')} className="h-11 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm active:scale-95 transition-all">
          3
        </button>
        <button onClick={() => handleOp('+')} className={`h-11 rounded-full font-bold text-sm active:scale-95 transition-all ${operator === '+' ? 'bg-white text-amber-500' : 'bg-amber-500 hover:bg-amber-400 text-white'}`}>
          +
        </button>

        {/* Row 5 */}
        <button onClick={() => handleDigit('0')} className="h-11 col-span-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm pl-5 text-left active:scale-95 transition-all">
          0
        </button>
        <button onClick={handleDecimal} className="h-11 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm active:scale-95 transition-all">
          .
        </button>
        <button onClick={calculate} className="h-11 rounded-full bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm active:scale-95 transition-all">
          =
        </button>
      </div>
    </motion.div>
  );
};
