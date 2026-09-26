import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOSStore } from '../../store/useOSStore';
import { X, Bell, Trash2, ChevronUp } from 'lucide-react';
import { AppIconGlyph } from '../ui/AppIconGlyph';

export const NotificationCenter: React.FC = () => {
  const {
    isNotificationCenterOpen,
    toggleNotificationCenter,
    notifications,
    dismissNotification,
    clearAllNotifications,
    openApp,
    theme
  } = useOSStore();

  if (!isNotificationCenterOpen) return null;

  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const dateString = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const handleNotificationClick = (appId: any, notifId: string) => {
    dismissNotification(notifId);
    toggleNotificationCenter(false);
    openApp(appId);
  };

  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '-100%', opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className={`ios-notification-center absolute inset-0 z-[60] flex flex-col select-none overflow-hidden ${isDark ? 'ios-notification-center--dark text-white' : 'ios-notification-center--light text-zinc-950'}`}
      >
        {/* Top Handle & Dismiss Bar */}
        <div className="pt-10 px-6 pb-3 flex flex-col items-center">
          <div
            onClick={() => toggleNotificationCenter(false)}
            className="w-12 h-1.5 rounded-full bg-white/30 cursor-pointer hover:bg-white/50 transition-colors mb-4"
          />

          {/* Clock & Date Header */}
          <div className="text-center">
            <span className={`text-xs font-semibold tracking-wide uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {dateString}
            </span>
            <h1 className={`text-5xl font-light tracking-tight my-1 font-sans ${isDark ? 'text-white' : 'text-zinc-950'}`}>
              {timeString.split(' ')[0]}
            </h1>
          </div>
        </div>

        {/* Action Bar: Title & Clear All */}
        <div className={`px-6 py-2 flex items-center justify-between border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Notification Center
            </span>
            {notifications.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold text-white">
                {notifications.length}
              </span>
            )}
          </div>

          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-zinc-300 transition-colors border border-white/10"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Notifications Scroll Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-zinc-500 gap-2">
              <Bell className="w-8 h-8 opacity-40" />
              <span className="text-xs font-medium">No Older Notifications</span>
            </div>
          ) : (
            notifications.map((notif) => (
              <motion.div
                key={notif.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => handleNotificationClick(notif.appId, notif.id)}
                className={`relative p-3.5 rounded-[22px] backdrop-blur-xl shadow-lg cursor-pointer transition-all active:scale-[0.98] group border ${isDark ? 'bg-zinc-900/75 hover:bg-zinc-800/90 border-white/10' : 'bg-white/70 hover:bg-white/85 border-black/10'}`}
              >
                {/* Header: Icon, App Name, Time, Dismiss button */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-md bg-gradient-to-tr ${notif.gradient} flex items-center justify-center text-white`}
                    >
                      <AppIconGlyph name={notif.iconName} className="w-3.5 h-3.5" />
                    </div>
                    <span className={`text-xs font-bold ${isDark ? 'text-white/90' : 'text-zinc-900'}`}>{notif.appName}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">• {notif.time}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissNotification(notif.id);
                    }}
                    className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                {/* Content */}
                <div className="pl-7">
                  <h4 className={`text-xs font-bold leading-tight ${isDark ? 'text-white' : 'text-zinc-950'}`}>{notif.title}</h4>
                  <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">{notif.body}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Bottom swipe up dismiss bar */}
        <div
          onClick={() => toggleNotificationCenter(false)}
          className="py-4 flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          <ChevronUp className="w-5 h-5 text-zinc-400 animate-bounce" />
          <span className="text-[11px] font-medium text-zinc-400">Swipe up to close</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
