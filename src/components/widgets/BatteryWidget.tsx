import React from 'react';
import { WidgetSize } from '../../data/widgetsRegistry';
import { Smartphone, Headphones, Server, BatteryCharging } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface BatteryWidgetProps {
  size: WidgetSize;
}

export const BatteryWidget: React.FC<BatteryWidgetProps> = ({ size }) => {
  const { lowPowerMode } = useOSStore();

  const devices = [
    {
      name: 'iPhone 15',
      pct: 98,
      icon: Smartphone,
      isCharging: true
    },
    {
      name: 'AirPods Pro',
      pct: 100,
      icon: Headphones,
      isCharging: false
    },
    {
      name: 'CUTM Node',
      pct: 94,
      icon: Server,
      isCharging: true
    }
  ];

  if (size === 'medium') {
    return (
      <div className="w-full h-full p-4 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
            <BatteryCharging className="w-4 h-4 text-emerald-400" />
            <span>Batteries</span>
          </div>
          <span className="text-[10px] text-zinc-400 font-mono">3 Connected</span>
        </div>

        <div className="grid grid-cols-3 gap-2 my-auto">
          {devices.map((dev) => {
            const Icon = dev.icon;
            const strokeDash = `${dev.pct * 0.94} 100`;
            return (
              <div key={dev.name} className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="relative w-11 h-11 flex items-center justify-center mb-1">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-white/10"
                      strokeWidth="3.2"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={lowPowerMode ? 'text-amber-400' : 'text-emerald-400'}
                      strokeDasharray={strokeDash}
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <Icon className="absolute w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-bold text-white leading-none">{dev.pct}%</span>
                <span className="text-[9px] text-zinc-400 mt-1 truncate max-w-full">{dev.name}</span>
              </div>
            );
          })}
        </div>

        <div className="text-[9px] text-zinc-400 text-center">
          {lowPowerMode ? '⚡ Low Power Mode Active' : 'Optimal battery longevity active'}
        </div>
      </div>
    );
  }

  // Small 2x2
  return (
    <div className="w-full h-full p-3.5 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Battery</span>
        <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
      </div>

      <div className="flex items-center justify-center gap-3 my-auto">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-white/10"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={lowPowerMode ? 'text-amber-400' : 'text-emerald-400'}
              strokeDasharray="92 100"
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <Smartphone className="absolute w-4 h-4 text-white" />
        </div>
        <div>
          <span className="text-xl font-bold text-white block leading-tight">98%</span>
          <span className="text-[10px] text-zinc-400">iPhone</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-300 pt-1 border-t border-white/10">
        <span>AirPods: 100%</span>
        <span>Node: 94%</span>
      </div>
    </div>
  );
};
