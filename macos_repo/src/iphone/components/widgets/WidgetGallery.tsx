import React, { useState } from 'react';
import { WIDGETS_REGISTRY, WidgetDefinition, WidgetSize } from '../../data/widgetsRegistry';
import { useOSStore } from '../../store/useOSStore';
import { Search, X, Plus, Check } from 'lucide-react';
import { ClockWidget } from './ClockWidget';
import { WeatherWidget } from './WeatherWidget';
import { CalendarWidget } from './CalendarWidget';
import { BatteryWidget } from './BatteryWidget';
import { NowBuildingWidget } from './NowBuildingWidget';
import { RecentProjectsWidget } from './RecentProjectsWidget';
import { RecruiterWidget } from './RecruiterWidget';

export const WidgetGallery: React.FC = () => {
  const { isWidgetGalleryOpen, toggleWidgetGallery, addWidget, homePageIndex } = useOSStore();
  const [selectedWidget, setSelectedWidget] = useState<WidgetDefinition>(WIDGETS_REGISTRY[0]);
  const [selectedSize, setSelectedSize] = useState<WidgetSize>(WIDGETS_REGISTRY[0].defaultSize);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!isWidgetGalleryOpen) return null;

  const categories = ['All', 'Portfolio', 'Productivity', 'System', 'Weather & Time'];

  const filteredWidgets = WIDGETS_REGISTRY.filter((w) => {
    const matchesCat = activeCategory === 'All' || w.category === activeCategory;
    const matchesSearch =
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelectWidget = (widget: WidgetDefinition) => {
    setSelectedWidget(widget);
    if (!widget.supportedSizes.includes(selectedSize)) {
      setSelectedSize(widget.defaultSize);
    }
  };

  const handleAddCurrent = () => {
    addWidget(selectedWidget.id, selectedSize, homePageIndex);
  };

  const renderPreview = () => {
    switch (selectedWidget.type) {
      case 'clock':
        return <ClockWidget size={selectedSize} />;
      case 'weather':
        return <WeatherWidget size={selectedSize} />;
      case 'calendar':
        return <CalendarWidget size={selectedSize} />;
      case 'battery':
        return <BatteryWidget size={selectedSize} />;
      case 'now_building':
        return <NowBuildingWidget size={selectedSize} />;
      case 'recent_projects':
        return <RecentProjectsWidget size={selectedSize} />;
      case 'recruiter_glance':
        return <RecruiterWidget size={selectedSize} />;
      default:
        return <ClockWidget size={selectedSize} />;
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop tap to dismiss */}
      <div className="flex-1" onClick={() => toggleWidgetGallery(false)} />

      {/* Main Glass Sheet */}
      <div className="relative w-full max-h-[85%] rounded-t-[36px] bg-zinc-900/95 border-t border-white/20 p-5 flex flex-col shadow-2xl overflow-hidden">
        {/* Grab Handle & Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="w-8" />
          <div className="flex flex-col items-center">
            <div className="w-10 h-1 rounded-full bg-zinc-600 mb-2" />
            <h3 className="text-base font-bold text-white tracking-tight">Widget Gallery</h3>
          </div>
          <button
            onClick={() => toggleWidgetGallery(false)}
            className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative my-3">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search Widgets"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-800/80 text-white placeholder-zinc-500 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-hidden focus:ring-1 focus:ring-sky-500 border border-white/5"
          />
        </div>

        {/* Categories Chips */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-sky-500 text-white'
                  : 'bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Scrollable Widget Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-2 space-y-4">
          {/* Active Preview Area */}
          <div className="flex flex-col items-center p-4 rounded-2xl bg-zinc-950/60 border border-white/10">
            {/* Size Switcher Pills */}
            <div className="flex items-center gap-1.5 bg-zinc-800/80 p-1 rounded-xl mb-4 border border-white/5">
              {selectedWidget.supportedSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    selectedSize === size
                      ? 'bg-zinc-600 text-white shadow-xs'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Simulated Live Widget Tile */}
            <div
              className={`rounded-[26px] overflow-hidden ios-glass-dark border border-white/20 transition-all duration-300 shadow-xl ${
                selectedSize === 'small'
                  ? 'w-[145px] h-[145px]'
                  : selectedSize === 'medium'
                  ? 'w-full max-w-[310px] h-[150px]'
                  : 'w-full max-w-[310px] h-[280px]'
              }`}
            >
              {renderPreview()}
            </div>

            {/* Widget Title & Description */}
            <div className="text-center mt-3">
              <h4 className="text-sm font-bold text-white">{selectedWidget.title}</h4>
              <p className="text-[11px] text-zinc-400 max-w-xs mt-0.5">{selectedWidget.description}</p>
            </div>

            {/* Add Widget Button */}
            <button
              onClick={handleAddCurrent}
              className="mt-3 flex items-center gap-1.5 px-5 py-2 rounded-full bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Widget (Page {homePageIndex + 1})</span>
            </button>
          </div>

          {/* Quick List Selection */}
          <div>
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 px-1">
              Available Widgets
            </span>
            <div className="grid grid-cols-1 gap-2">
              {filteredWidgets.map((w) => {
                const isSelected = selectedWidget.id === w.id;
                return (
                  <div
                    key={w.id}
                    onClick={() => handleSelectWidget(w)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-sky-500/15 border-sky-500/40 text-white'
                        : 'bg-zinc-800/50 border-white/5 text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>{w.title}</span>
                        <span className="text-[9px] font-normal text-zinc-400">({w.category})</span>
                      </div>
                      <div className="text-[10px] text-zinc-400 truncate max-w-[240px]">
                        {w.description}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-sky-400" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
