import React, { useState, useEffect } from 'react';
import { WidgetSize } from '../../data/widgetsRegistry';
import { Clock, Globe } from 'lucide-react';

interface ClockWidgetProps {
  size: WidgetSize;
}

export const ClockWidget: React.FC<ClockWidgetProps> = ({ size }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const dayName = time.toLocaleDateString('en-US', { weekday: 'short' });
  const monthName = time.toLocaleDateString('en-US', { month: 'short' });
  const dayNum = time.getDate();
  const timeString = `${hours % 12 || 12}:${minutes}`;
  const ampm = hours >= 12 ? 'PM' : 'AM';

  if (size === 'medium') {
    return (
      <div className="w-full h-full p-4 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between text-zinc-400">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>World Clock</span>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">IST (UTC+5:30)</span>
        </div>

        <div className="flex items-baseline justify-between mt-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-light tracking-tight text-white font-sans">{timeString}</span>
              <span className="text-xs font-bold text-zinc-400">{ampm}</span>
              <span className="text-[11px] font-mono text-zinc-500">:{seconds}</span>
            </div>
            <div className="text-xs font-medium text-zinc-300 mt-0.5">
              {dayName}, {monthName} {dayNum}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold text-white">Bhubaneswar</div>
            <div className="text-[10px] text-zinc-400">Centurion University CUTM</div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400">
          <span>San Francisco: -12.5h</span>
          <span>London: -4.5h</span>
          <span>Tokyo: +3.5h</span>
        </div>
      </div>
    );
  }

  // Small 2x2
  return (
    <div className="w-full h-full p-3.5 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Bhubaneswar</span>
        <Clock className="w-3.5 h-3.5 text-zinc-400" />
      </div>

      <div className="my-auto text-center">
        <div className="flex items-baseline justify-center gap-0.5">
          <span className="text-2xl font-light tracking-tighter text-white">{timeString}</span>
          <span className="text-[10px] font-semibold text-zinc-400">{ampm}</span>
        </div>
        <div className="text-[11px] font-medium text-zinc-300 mt-0.5">
          {dayName}, {monthName} {dayNum}
        </div>
      </div>

      <div className="text-[10px] text-zinc-400 text-center font-mono">
        IST • Today
      </div>
    </div>
  );
};
