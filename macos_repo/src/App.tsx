import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { DeviceProvider, useDevice } from './context/DeviceContext';
import { LandingDestination, LandingScreen } from './components/common/LandingScreen';
import { DesktopBackground } from './components/mac/system/DesktopBackground';
import { sound } from './utils/audioHaptics';
import { ErrorPage, getPathErrorStatus, PortfolioErrorBoundary } from './components/common/ErrorPage';
import { setOSState } from './iphone/store/useOSStore';

const DesktopMenuBar = lazy(() => import('./components/desktop/DesktopMenuBar').then(module => ({ default: module.DesktopMenuBar })));
const DesktopDock = lazy(() => import('./components/desktop/DesktopDock').then(module => ({ default: module.DesktopDock })));
const DesktopWindowManager = lazy(() => import('./components/desktop/DesktopWindowManager').then(module => ({ default: module.DesktopWindowManager })));
const DesktopSpotlight = lazy(() => import('./components/desktop/DesktopSpotlight').then(module => ({ default: module.DesktopSpotlight })));
const DesktopIconsHome = lazy(() => import('./components/desktop/DesktopIconsHome').then(module => ({ default: module.DesktopIconsHome })));
const IPhoneView = lazy(() => import('./iphone/IPhoneView').then(module => ({ default: module.IPhoneView })));
const IPadView = lazy(() => import('./iphone/IPadView').then(module => ({ default: module.IPadView })));

const PortfolioRoot: React.FC = () => {
  const { deviceMode, settings, resolvedTheme, openDesktopWindow } = useDevice();
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [isLandingLocked, setIsLandingLocked] = useState(true);
  const landingTransitionStarted = useRef(false);

  useEffect(() => {
    setOSState({theme: resolvedTheme});
    document.documentElement.classList.toggle('light', resolvedTheme === 'light');
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const handleLandingExplore = (destination: LandingDestination = 'home') => {
    if (landingTransitionStarted.current) return;
    landingTransitionStarted.current = true;
    setIsLandingLocked(false);

    // Ensure iPhone begins on HomeScreen unlocked and all drawers closed
    try {
      setOSState({
        isLocked: false,
        activeApp: null,
        isControlCenterOpen: false,
        isNotificationCenterOpen: false,
        isSpotlightOpen: false
      });
    } catch {}

    if (deviceMode === 'desktop' && destination !== 'home') {
      const desktopApp = destination === 'work' ? 'about' : destination === 'expertise' ? 'skills' : destination === 'contact' ? 'mail' : destination;
      openDesktopWindow(desktopApp);
    } else if (destination !== 'home') {
      const mobileApp = destination === 'work' ? 'about' : destination === 'expertise' ? 'skills' : destination === 'contact' ? 'mail' : destination;
      try {
        setOSState({
          activeApp: mobileApp
        });
      } catch {}
    }
  };

  useEffect(() => {
    const handleRestartToLanding = () => {
      setIsLandingLocked(true);
      landingTransitionStarted.current = false;
      try {
        setOSState({
          isLocked: true,
          activeApp: null
        });
      } catch {}
    };
    window.addEventListener('ios_restart_to_landing', handleRestartToLanding);
    return () => window.removeEventListener('ios_restart_to_landing', handleRestartToLanding);
  }, []);

  // Global Keyboard Shortcut (Cmd+K for Spotlight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.tap();
        setSpotlightOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute brightness factor (0.4 to 1.1) based on settings.brightness (0 to 100)
  const brightnessFactor = Math.max(0.4, (settings.brightness || 90) / 100);

  return (
    <div 
      className={`fixed inset-0 w-screen h-[100dvh] min-h-[100svh] overflow-hidden select-none font-sans relative transition-colors duration-300 ${
        resolvedTheme === 'dark' ? 'dark bg-neutral-950 text-white' : 'light bg-neutral-100 text-neutral-900'
      }`}
      style={{
        filter: `brightness(${brightnessFactor})`,
        transition: 'filter 0.15s ease-out'
      }}
    >
      {/* Render View Based on Active Mode and Landing Lock State */}
      <Suspense fallback={<div className="fixed inset-0 bg-[#05080d]" aria-hidden="true" />}>
        {isLandingLocked ? (
          deviceMode === 'desktop' ? (
            <DesktopBackground>
              <LandingScreen onExplore={handleLandingExplore} showSystemHud={true} />
            </DesktopBackground>
          ) : (
            <div className="fixed inset-0 w-full h-full overflow-y-auto no-scrollbar">
              <LandingScreen onExplore={handleLandingExplore} showSystemHud={false} />
            </div>
          )
        ) : deviceMode === 'desktop' ? (
          <DesktopBackground>
            <div className="fixed inset-0 w-full h-full flex flex-col justify-between overflow-hidden portfolio-rising">
              <DesktopMenuBar onOpenSpotlight={() => setSpotlightOpen(true)} />
              <DesktopIconsHome />
              <DesktopWindowManager />
              <DesktopDock />
            </div>
          </DesktopBackground>
        ) : deviceMode === 'tablet' ? (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-black md:bg-radial md:from-slate-900 md:via-neutral-950 md:to-black">
            <IPadView />
          </div>
        ) : (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-black md:bg-radial md:from-slate-900 md:via-neutral-950 md:to-black">
            <IPhoneView />
          </div>
        )}

        {deviceMode === 'desktop' && !isLandingLocked && (
          <DesktopSpotlight isOpen={spotlightOpen} onClose={() => setSpotlightOpen(false)} />
        )}

      </Suspense>
    </div>
  );
};

export default function App() {
  const pathErrorStatus = getPathErrorStatus();
  if (pathErrorStatus) return <ErrorPage status={pathErrorStatus} />;

  return (
    <PortfolioErrorBoundary>
      <DeviceProvider>
        <PortfolioRoot />
      </DeviceProvider>
    </PortfolioErrorBoundary>
  );
}
