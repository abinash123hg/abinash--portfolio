import React from 'react';
import { WidgetSize } from '../../data/widgetsRegistry';
import { Sun, CloudSun, Wind, Droplets, MapPin } from 'lucide-react';

interface WeatherWidgetProps {
  size: WidgetSize;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ size }) => {
  if (size === 'medium') {
    return (
      <div className="w-full h-full p-4 flex flex-col justify-between select-none">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1 text-xs font-bold text-white">
              <MapPin className="w-3 h-3 text-sky-400" />
              <span>Bhubaneswar</span>
            </div>
            <div className="text-[10px] text-zinc-400">Mostly Clear • Air Quality 48 (Good)</div>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="w-6 h-6 text-amber-400 animate-spin-slow" />
            <span className="text-2xl font-light text-white">29°</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center py-2 border-y border-white/10 my-1">
          <div>
            <span className="text-[9px] text-zinc-400 block">Now</span>
            <Sun className="w-3.5 h-3.5 mx-auto text-amber-400 my-0.5" />
            <span className="text-[10px] font-semibold text-white">29°</span>
          </div>
          <div>
            <span className="text-[9px] text-zinc-400 block">1 PM</span>
            <Sun className="w-3.5 h-3.5 mx-auto text-amber-400 my-0.5" />
            <span className="text-[10px] font-semibold text-white">31°</span>
          </div>
          <div>
            <span className="text-[9px] text-zinc-400 block">4 PM</span>
            <CloudSun className="w-3.5 h-3.5 mx-auto text-sky-300 my-0.5" />
            <span className="text-[10px] font-semibold text-white">28°</span>
          </div>
          <div>
            <span className="text-[9px] text-zinc-400 block">7 PM</span>
            <CloudSun className="w-3.5 h-3.5 mx-auto text-indigo-300 my-0.5" />
            <span className="text-[10px] font-semibold text-white">25°</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-zinc-400">
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3 text-blue-400" />
            <span>Humidity 62%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-3 h-3 text-teal-400" />
            <span>Wind 9 km/h</span>
          </div>
          <span>H: 32° L: 22°</span>
        </div>
      </div>
    );
  }

  // Small 2x2
  return (
    <div className="w-full h-full p-3.5 flex flex-col justify-between select-none">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-bold text-white block">Bhubaneswar</span>
          <span className="text-[10px] text-zinc-400">Clear</span>
        </div>
        <Sun className="w-5 h-5 text-amber-400" />
      </div>

      <div className="my-auto">
        <span className="text-3xl font-light text-white tracking-tighter">29°</span>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-400">
        <span>H: 32°</span>
        <span>L: 22°</span>
      </div>
    </div>
  );
};
