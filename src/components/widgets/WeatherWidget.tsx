import React from 'react';
import { WidgetSize } from '../../data/widgetsRegistry';
import { Sun, CloudSun, Wind, Droplets, MapPin } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface WeatherWidgetProps {
  size: WidgetSize;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ size }) => {
  const { theme } = useOSStore();
  const isDark = theme === 'dark';
  const primary = isDark ? 'text-white' : 'text-zinc-900';
  const muted = isDark ? 'text-zinc-400' : 'text-zinc-600';

  if (size === 'medium') {
    return (
      <div className="w-full h-full p-4 flex flex-col justify-between select-none">
        <div className="flex items-start justify-between">
          <div>
            <div className={`flex items-center gap-1 text-xs font-bold ${primary}`}>
              <MapPin className="w-3 h-3 text-sky-500" aria-hidden="true" />
              <span>Bhubaneswar</span>
            </div>
            <div className={`text-xs ${muted}`}>Mostly Clear • Air Quality 48 (Good)</div>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="w-6 h-6 text-amber-500 animate-spin-slow" aria-hidden="true" />
            <span className={`text-2xl font-light ${primary}`}>29°</span>
          </div>
        </div>

        <div className={`grid grid-cols-4 gap-2 text-center py-2 border-y my-1 ${isDark ? 'border-white/10' : 'border-zinc-200'}`}>
          <div>
            <span className={`text-[11px] block ${muted}`}>Now</span>
            <Sun className="w-3.5 h-3.5 mx-auto text-amber-500 my-0.5" aria-hidden="true" />
            <span className={`text-xs font-semibold ${primary}`}>29°</span>
          </div>
          <div>
            <span className={`text-[11px] block ${muted}`}>1 PM</span>
            <Sun className="w-3.5 h-3.5 mx-auto text-amber-500 my-0.5" aria-hidden="true" />
            <span className={`text-xs font-semibold ${primary}`}>31°</span>
          </div>
          <div>
            <span className={`text-[11px] block ${muted}`}>4 PM</span>
            <CloudSun className="w-3.5 h-3.5 mx-auto text-sky-500 my-0.5" aria-hidden="true" />
            <span className={`text-xs font-semibold ${primary}`}>28°</span>
          </div>
          <div>
            <span className={`text-[11px] block ${muted}`}>7 PM</span>
            <CloudSun className="w-3.5 h-3.5 mx-auto text-indigo-500 my-0.5" aria-hidden="true" />
            <span className={`text-xs font-semibold ${primary}`}>25°</span>
          </div>
        </div>

        <div className={`flex items-center justify-between text-xs ${muted}`}>
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3 text-blue-500" aria-hidden="true" />
            <span>Humidity 62%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-3 h-3 text-teal-500" aria-hidden="true" />
            <span>Wind 9 km/h</span>
          </div>
          <span>H: 32° L: 22°</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-3.5 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between">
        <span className={`text-xs font-bold ${primary}`}>Bhubaneswar</span>
        <Sun className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
      </div>

      <div className="my-auto">
        <span className={`text-3xl font-light tracking-tighter ${primary}`}>29°</span>
        <span className={`text-xs block mt-0.5 ${muted}`}>Clear</span>
      </div>

      <div className={`flex items-center justify-between text-xs pt-1.5 border-t ${muted} ${isDark ? 'border-white/10' : 'border-zinc-200'}`}>
        <span>H: 32°</span>
        <span>L: 22°</span>
      </div>
    </div>
  );
};
