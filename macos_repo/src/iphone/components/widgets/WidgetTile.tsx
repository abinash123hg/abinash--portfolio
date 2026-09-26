import React from 'react';
import { PlacedWidget } from '../../data/widgetsRegistry';
import { useOSStore } from '../../store/useOSStore';
import { ClockWidget } from './ClockWidget';
import { WeatherWidget } from './WeatherWidget';
import { CalendarWidget } from './CalendarWidget';
import { BatteryWidget } from './BatteryWidget';
import { NowBuildingWidget } from './NowBuildingWidget';
import { RecentProjectsWidget } from './RecentProjectsWidget';
import { RecruiterWidget } from './RecruiterWidget';
import { Minus } from 'lucide-react';

interface WidgetTileProps {
  widget: PlacedWidget;
}

export const WidgetTile: React.FC<WidgetTileProps> = ({ widget }) => {
  const { isHomeEditing, removeWidget, theme } = useOSStore();
  const isDark = theme === 'dark';

  const renderContent = () => {
    switch (widget.type) {
      case 'clock':
        return <ClockWidget size={widget.size} />;
      case 'weather':
        return <WeatherWidget size={widget.size} />;
      case 'calendar':
        return <CalendarWidget size={widget.size} />;
      case 'battery':
        return <BatteryWidget size={widget.size} />;
      case 'now_building':
        return <NowBuildingWidget size={widget.size} />;
      case 'recent_projects':
        return <RecentProjectsWidget size={widget.size} />;
      case 'recruiter_glance':
        return <RecruiterWidget size={widget.size} />;
      default:
        return <ClockWidget size={widget.size} />;
    }
  };

  const sizeClasses =
    widget.size === 'small'
      ? 'col-span-2 aspect-square'
      : widget.size === 'medium'
      ? 'col-span-2 h-20'
      : 'col-span-2 h-36';


  return (
    <div
      className={`ios-home-widget ios-wallpaper-text relative min-w-0 ${sizeClasses} rounded-[26px] overflow-hidden transition-all duration-300 ${
        isDark ? 'ios-glass-dark' : 'liquid-glass-card-light shadow-md'
      } ${isHomeEditing ? 'animate-jiggle select-none' : 'ios-press-active'}`}
      style={{
        boxShadow: isDark
          ? '0 10px 30px -5px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
          : '0 8px 24px -4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
      }}
    >
      {/* Remove Button in Edit Mode */}
      {isHomeEditing && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeWidget(widget.instanceId);
          }}
          className="absolute -top-1 -left-1 z-30 w-6 h-6 rounded-full bg-zinc-700 text-white flex items-center justify-center border-2 border-white shadow-md hover:bg-zinc-600 transition-colors"
          title="Remove widget"
        >
          <Minus className="w-3.5 h-3.5 stroke-[3]" />
        </button>
      )}

      {/* Actual Widget Content */}
      <div className={`w-full h-full ${isHomeEditing ? 'pointer-events-none' : ''}`}>
        {renderContent()}
      </div>
    </div>
  );
};
