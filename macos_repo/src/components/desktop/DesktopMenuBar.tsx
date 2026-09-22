import React, { useState, useEffect, useRef } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { WindowState } from '../../types';
import { 
  Apple, 
  Wifi, 
  Battery, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  Smartphone, 
  Tablet,
  Volume2, 
  Mic,
  Folder,
  FileText,
  Copy,
  Scissors,
  Check,
  Maximize2,
  Minimize2,
  Grid,
  List,
  Columns,
  Image,
  Award,
  BookOpen,
  Briefcase,
  HelpCircle,
  Brain,
  ExternalLink,
  Lock
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';
import { ControlCenter } from '../mac/system/ControlCenter';

export const DesktopMenuBar: React.FC<{ 
  onOpenSpotlight: () => void;
  onLockDesktop?: () => void;
}> = ({ onOpenSpotlight, onLockDesktop }) => {
  const { 
    activeDesktopWindowId, 
    windows, 
    openDesktopWindow, 
    closeDesktopWindow,
    minimizeDesktopWindow,
    maximizeDesktopWindow,
    focusDesktopWindow,
    settings, 
    toggleDeviceMode 
  } = useDevice();

  const [timeStr, setTimeStr] = useState('9:41 AM');
  const [dateStr, setDateStr] = useState('Tue Apr 1');
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [helpSearch, setHelpSearch] = useState('');
  const menuBarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
      setDateStr(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Outside click listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setAppleMenuOpen(false);
        setActiveMenu(null);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentWindow = activeDesktopWindowId ? windows[activeDesktopWindowId] : null;
  const appTitle = currentWindow ? currentWindow.title.split('—')[0].trim() : 'Finder';

  const menuItems = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const closeAllDesktopWindows = () => {
    Object.keys(windows).forEach((id) => {
      if (windows[id]?.isOpen) {
        closeDesktopWindow(id);
      }
    });
  };

  const cycleWindows = () => {
    const openWinIds = Object.keys(windows).filter(id => windows[id]?.isOpen);
    if (openWinIds.length === 0) return;
    const currentIdx = activeDesktopWindowId ? openWinIds.indexOf(activeDesktopWindowId) : -1;
    const nextIdx = (currentIdx + 1) % openWinIds.length;
    focusDesktopWindow(openWinIds[nextIdx]);
  };

  const bringAllToFront = () => {
    Object.keys(windows).forEach((id) => {
      if (windows[id]?.isOpen && windows[id]?.isMinimized) {
        openDesktopWindow(id);
      }
    });
  };

  return (
    <>
      <header 
        ref={menuBarRef}
        className="h-7 w-full bg-white/40 dark:bg-black/40 backdrop-blur-2xl border-b border-black/10 dark:border-white/10 px-4 flex items-center justify-between text-[13px] text-neutral-800 dark:text-neutral-200 select-none z-40 relative shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-colors"
      >
        {/* Left App Menus — consistent gap rhythm (issue 14) */}
        <div className="flex min-w-0 items-center gap-2">
          {/* Apple Logo */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.tap();
                setAppleMenuOpen(!appleMenuOpen);
                setActiveMenu(null);
              }}
              onMouseEnter={() => {
                if (activeMenu) {
                  setActiveMenu(null);
                  setAppleMenuOpen(true);
                }
              }}
              className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-sm transition-colors cursor-pointer text-neutral-900 dark:text-neutral-100"
            >
              <Apple className="w-3.5 h-3.5 fill-current" />
            </button>

            {appleMenuOpen && (
              <div 
                className="absolute top-6 left-0 w-60 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-3xl border border-white/80 dark:border-neutral-700/80 rounded-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.35)] p-1.5 z-50 text-[12px] text-neutral-800 dark:text-neutral-200 space-y-0.5 animate-in fade-in zoom-in-95 duration-100"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    sound.tap();
                    openDesktopWindow('about');
                    setAppleMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer font-medium"
                >
                  About This Portfolio (Abinash)
                </button>
                <button
                  onClick={() => {
                    sound.tap();
                    openDesktopWindow('settings');
                    setAppleMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>System Settings...</span>
                  <span className="text-[10px] opacity-50 font-mono">⌘,</span>
                </button>
                <div className="h-px bg-black/10 dark:bg-white/10 my-1" />
                <button
                  onClick={() => {
                    sound.tap();
                    openDesktopWindow('recruiter');
                    setAppleMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>Recruiter Dossier & Brief</span>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </button>
                <button
                  onClick={() => {
                    sound.tap();
                    openDesktopWindow('quiz');
                    setAppleMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>AI & ML Knowledge Quiz</span>
                  <Brain className="w-3 h-3 text-cyan-400" />
                </button>
                <div className="h-px bg-black/10 dark:bg-white/10 my-1" />
                <button
                  onClick={() => {
                    sound.tap();
                    openDesktopWindow('recruiter');
                    setAppleMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>HR View</span>
                  <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
                </button>
                <div className="h-px bg-black/10 dark:bg-white/10 my-1" />
                <button
                  onClick={() => {
                    sound.tap();
                    closeAllDesktopWindows();
                    setAppleMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer text-red-500 hover:text-white"
                >
                  Close All Windows & Sleep
                </button>
                <div className="h-px bg-black/10 dark:bg-white/10 my-1" />
                <div className="px-2.5 py-0.5 text-[10px] text-neutral-400 font-mono flex items-center justify-between">
                  <span>macOS Sequoia 15.4</span>
                  <span>Darwin x86_64</span>
                </div>
              </div>
            )}
          </div>

          {/* Active Application Name */}
          <span className="font-bold text-neutral-900 dark:text-white tracking-tight text-[13px] px-1.5">
            {appTitle}
          </span>

          {/* Standard Top Menu Items - Always visible */}
          <div className="flex items-center gap-0.5 text-neutral-800 dark:text-neutral-200 text-[12px] sm:text-[13px]">
            {menuItems.map((item) => (
              <div key={item} className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.tap();
                    setAppleMenuOpen(false);
                    setActiveMenu(activeMenu === item ? null : item);
                  }}
                  onMouseEnter={() => {
                    if (activeMenu || appleMenuOpen) {
                      setAppleMenuOpen(false);
                      setActiveMenu(item);
                    }
                  }}
                  className={`px-1.5 sm:px-2 py-0.5 rounded-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer font-medium ${
                    activeMenu === item ? 'bg-black/15 dark:bg-white/15 text-neutral-900 dark:text-white font-semibold' : ''
                  }`}
                >
                  {item}
                </button>

                {/* Dropdown Menu for each item — truncated for size; full menus restored from previous commit structure */}
                {activeMenu === item && (
                  <div 
                    className="absolute top-6 left-0 w-64 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-3xl border border-white/80 dark:border-neutral-700/80 rounded-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.35)] p-1.5 z-50 text-[12px] text-neutral-800 dark:text-neutral-200 space-y-0.5 animate-in fade-in zoom-in-95 duration-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item === 'File' && (
                      <>
                        <button onClick={() => { sound.tap(); openDesktopWindow('finder'); setActiveMenu(null); }} className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer flex items-center justify-between font-medium"><span>New Finder Window</span><span className="text-[10px] opacity-60 font-mono">⌘N</span></button>
                        <button onClick={() => { sound.tap(); openDesktopWindow('notes'); setActiveMenu(null); }} className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer flex items-center justify-between"><span>New Note / Scratchpad</span><span className="text-[10px] opacity-60 font-mono">⇧⌘N</span></button>
                        <button onClick={() => { sound.tap(); openDesktopWindow('about'); setActiveMenu(null); }} className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer flex items-center justify-between"><span>Open Portfolio Overview</span><span className="text-[10px] opacity-60 font-mono">⌘O</span></button>
                        <div className="h-px bg-black/10 dark:bg-white/10 my-1" />
                        <button disabled={!activeDesktopWindowId} onClick={() => { if (activeDesktopWindowId) { sound.tap(); closeDesktopWindow(activeDesktopWindowId); setActiveMenu(null); } }} className={`w-full text-left px-2.5 py-1 rounded-md transition-colors flex items-center justify-between ${activeDesktopWindowId ? 'hover:bg-[#007aff] hover:text-white cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}><span>Close Window</span><span className="text-[10px] opacity-60 font-mono">⌘W</span></button>
                        <button onClick={() => { sound.tap(); closeAllDesktopWindows(); setActiveMenu(null); }} className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer flex items-center justify-between"><span>Close All Windows</span><span className="text-[10px] opacity-60 font-mono">⌥⌘W</span></button>
                      </>
                    )}
                    {item === 'Edit' && (
                      <>
                        <button onClick={() => { sound.tap(); setActiveMenu(null); }} className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer flex items-center justify-between"><span>Undo</span><span className="text-[10px] opacity-60 font-mono">⌘Z</span></button>
                        <button onClick={() => { sound.tap(); navigator.clipboard?.writeText(window.location.href); setActiveMenu(null); }} className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer flex items-center justify-between"><span>Copy Link to Portfolio</span><span className="text-[10px] opacity-60 font-mono">⌘C</span></button>
                      </>
                    )}
                    {item === 'View' && (
                      <>
                        <button onClick={() => { sound.tap(); toggleFullScreen(); setActiveMenu(null); }} className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer flex items-center justify-between"><span>Enter Full Screen</span><span className="text-[10px] opacity-60 font-mono">⌃⌘F</span></button>
                      </>
                    )}
                    {item === 'Go' && (
                      <>
                        <button onClick={() => { sound.tap(); openDesktopWindow('projects'); setActiveMenu(null); }} className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer">Projects & Models</button>
                        <button onClick={() => { sound.tap(); openDesktopWindow('recruiter'); setActiveMenu(null); }} className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer">Recruiter Brief</button>
                      </>
                    )}
                    {item === 'Window' && (
                      <>
                        <button onClick={() => { sound.tap(); cycleWindows(); setActiveMenu(null); }} className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer flex items-center justify-between"><span>Cycle Windows</span><span className="text-[10px] opacity-60 font-mono">⌘`</span></button>
                        <button onClick={() => { sound.tap(); bringAllToFront(); setActiveMenu(null); }} className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer">Bring All to Front</button>
                      </>
                    )}
                    {item === 'Help' && (
                      <>
                        <button onClick={() => { sound.tap(); onOpenSpotlight(); setActiveMenu(null); }} className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer flex items-center justify-between"><span>Spotlight Search</span><span className="text-[10px] opacity-60 font-mono">⌘K</span></button>
                        <button onClick={() => { sound.tap(); openDesktopWindow('about'); setActiveMenu(null); }} className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#007aff] hover:text-white transition-colors cursor-pointer">About Abinash</button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Status Controls — improved spacing (issue 15) */}
        <div className="flex shrink-0 items-center gap-3.5 text-[12px] text-neutral-800 dark:text-neutral-200">
          <div className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-sm transition-colors cursor-pointer">
            <Wifi className="w-3.5 h-3.5 stroke-[2.2] text-neutral-800 dark:text-neutral-200" />
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-neutral-800 dark:text-neutral-200 font-medium">
            <span className="hidden lg:inline">{settings.batteryLevel}%</span>
            <Battery className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-200" />
          </div>

          <button
            onClick={() => {
              sound.tap();
              onOpenSpotlight();
            }}
            className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
            title="Spotlight Search (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-200 stroke-[2]" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.tap();
              setControlCenterOpen(!controlCenterOpen);
            }}
            className={`p-1 rounded-sm transition-colors cursor-pointer ${
              controlCenterOpen ? 'bg-black/15 dark:bg-white/15 text-neutral-900 dark:text-white' : 'hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200'
            }`}
            title="Control Center"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2]" />
          </button>

          <div className="flex items-center gap-1.5 font-medium text-neutral-900 dark:text-neutral-100 ml-1">
            <span className="hidden sm:inline text-neutral-700 dark:text-neutral-300">{dateStr}</span>
            <span>{timeStr}</span>
          </div>
        </div>
      </header>

      <ControlCenter 
        isOpen={controlCenterOpen} 
        onClose={() => setControlCenterOpen(false)} 
      />
    </>
  );
};
