import React from 'react';
import { WidgetSize } from '../../data/widgetsRegistry';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface CalendarWidgetProps {
  size: WidgetSize;
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({ size }) => {
  const { setActiveApp } = useOSStore();
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNum = now.getDate();

  const handleOpenCalendar = () => {
    setActiveApp('calendar');
  };

  if (size === 'medium') {
    return (
      <div
        onClick={handleOpenCalendar}
        className="w-full h-full p-4 flex flex-col justify-between select-none cursor-pointer hover:opacity-95 transition-opacity"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500 flex flex-col items-center justify-center text-white shadow-xs">
              <span className="text-[8px] font-bold uppercase leading-none">{dayName}</span>
              <span className="text-sm font-extrabold leading-none">{dayNum}</span>
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Up Next</span>
              <span className="text-[10px] text-zinc-400">Centurion University CUTM Schedule</span>
            </div>
          </div>
          <Calendar className="w-4 h-4 text-rose-400" />
        </div>

        <div className="bg-white/10 rounded-xl p-2.5 my-1 border border-white/10">
          <div className="flex items-center justify-between text-[11px] font-semibold text-white">
            <span>Agentic Systems Tech Review</span>
            <span className="text-[10px] font-mono text-rose-300">In 45m</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-zinc-300 mt-1">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-400" />
              <span>10:00 - 10:45 AM</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-zinc-400" />
              <span>AI Lab Room 204</span>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-zinc-400 truncate">
          Later: Reciprocal Rank Fusion presentation with CS department
        </div>
      </div>
    );
  }

  // Small 2x2
  return (
    <div
      onClick={handleOpenCalendar}
      className="w-full h-full p-3.5 flex flex-col justify-between select-none cursor-pointer hover:opacity-95 transition-opacity"
    >
      <div className="flex items-start justify-between">
        <div className="w-8 h-8 rounded-lg bg-rose-500 flex flex-col items-center justify-center text-white shadow-xs">
          <span className="text-[8px] font-bold uppercase leading-none">{dayName}</span>
          <span className="text-sm font-extrabold leading-none">{dayNum}</span>
        </div>
        <span className="text-[10px] font-bold text-rose-400 uppercase">Up Next</span>
      </div>

      <div className="my-auto">
        <div className="text-[11px] font-bold text-white line-clamp-2 leading-snug">
          Agentic Systems Review
        </div>
        <div className="text-[10px] text-zinc-300 mt-0.5">10:00 AM</div>
      </div>

      <div className="text-[9px] text-zinc-400">CUTM AI Lab</div>
    </div>
  );
};
