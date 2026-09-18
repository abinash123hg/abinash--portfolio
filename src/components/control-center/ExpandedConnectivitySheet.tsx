import React from 'react';
import { motion } from 'motion/react';
import {
  Wifi,
  WifiOff,
  Bluetooth,
  Plane,
  Radio,
  Share2,
  Lock,
  Check,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface Props {
  onClose: () => void;
}

const WIFI_NETWORKS = [
  { id: 'cutm-5g', name: 'Abinash-Fiber-5G', secure: true, connected: true, signal: 3 },
  { id: 'campus', name: 'CUTM-Campus-WiFi', secure: true, connected: false, signal: 2 },
  { id: 'starlink', name: 'Starlink-Satellite', secure: true, connected: false, signal: 3 },
  { id: 'lab', name: 'AI-Research-Lab', secure: true, connected: false, signal: 1 }
];

const BT_DEVICES = [
  { id: 'airpods', name: 'AirPods Pro (2nd Gen)', connected: true, type: 'audio' },
  { id: 'macbook', name: 'MacBook Pro M3 Max', connected: false, type: 'computer' },
  { id: 'bose', name: 'Bose QC45', connected: false, type: 'audio' }
];

export const ExpandedConnectivitySheet: React.FC<Props> = ({ onClose }) => {
  const {
    wifi,
    toggleWifi,
    bluetooth,
    toggleBluetooth,
    airplaneMode,
    toggleAirplaneMode,
    cellularData,
    toggleCellularData,
    airDropMode,
    setAirDropMode,
    personalHotspot,
    togglePersonalHotspot,
    vpnConnected,
    toggleVPN,
    activeWifiNetwork,
    setActiveWifiNetwork,
    activeBluetoothDevice,
    setActiveBluetoothDevice
  } = useOSStore();

  const [activeSubTab, setActiveSubTab] = React.useState<'main' | 'wifi' | 'bluetooth' | 'airdrop'>('main');

  return (
    <motion.div
      initial={{ scale: 0.88, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.88, opacity: 0, y: 30 }}
      transition={{ type: 'spring', damping: 28, stiffness: 340 }}
      className="w-full max-w-[340px] rounded-[34px] bg-zinc-900/90 backdrop-blur-3xl border border-white/20 shadow-2xl p-4 text-white select-none relative overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
        {activeSubTab !== 'main' ? (
          <button
            onClick={() => setActiveSubTab('main')}
            className="text-xs text-blue-400 font-semibold flex items-center gap-1 active:opacity-70"
          >
            ← Back
          </button>
        ) : (
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
            Connectivity
          </h3>
        )}

        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 active:scale-95 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {activeSubTab === 'main' && (
        <div className="space-y-3">
          {/* Main 2x3 Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Airplane */}
            <button
              onClick={toggleAirplaneMode}
              className={`p-3 rounded-2xl flex items-center gap-3 transition-all ${
                airplaneMode ? 'bg-amber-500 text-white' : 'bg-white/10 hover:bg-white/15 text-zinc-300'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0">
                <Plane className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold">Airplane</p>
                <p className="text-[10px] opacity-70">{airplaneMode ? 'On' : 'Off'}</p>
              </div>
            </button>

            {/* Cellular */}
            <button
              onClick={toggleCellularData}
              disabled={airplaneMode}
              className={`p-3 rounded-2xl flex items-center gap-3 transition-all ${
                cellularData && !airplaneMode
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/10 opacity-60 text-zinc-400'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0">
                <Radio className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold">Cellular</p>
                <p className="text-[10px] opacity-70">{cellularData && !airplaneMode ? '5G Active' : 'Off'}</p>
              </div>
            </button>

            {/* Wi-Fi with sub-drill */}
            <div
              className={`p-3 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                wifi ? 'bg-blue-600 text-white' : 'bg-white/10 text-zinc-300'
              }`}
            >
              <div
                className="flex items-center gap-3 flex-1 overflow-hidden"
                onClick={toggleWifi}
              >
                <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0">
                  {wifi ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4 text-zinc-400" />}
                </div>
                <div className="text-left leading-tight truncate pr-1">
                  <p className="text-xs font-semibold">Wi-Fi</p>
                  <p className="text-[10px] opacity-80 truncate">{wifi ? activeWifiNetwork : 'Off'}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSubTab('wifi');
                }}
                className="p-1 rounded-full hover:bg-black/20"
              >
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>
            </div>

            {/* Bluetooth with sub-drill */}
            <div
              className={`p-3 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                bluetooth ? 'bg-blue-600 text-white' : 'bg-white/10 text-zinc-300'
              }`}
            >
              <div
                className="flex items-center gap-3 flex-1 overflow-hidden"
                onClick={toggleBluetooth}
              >
                <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0">
                  <Bluetooth className="w-4 h-4" />
                </div>
                <div className="text-left leading-tight truncate pr-1">
                  <p className="text-xs font-semibold">Bluetooth</p>
                  <p className="text-[10px] opacity-80 truncate">{bluetooth ? 'AirPods Pro' : 'Off'}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSubTab('bluetooth');
                }}
                className="p-1 rounded-full hover:bg-black/20"
              >
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>
            </div>

            {/* AirDrop */}
            <div
              onClick={() => setActiveSubTab('airdrop')}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/15 text-zinc-300 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0 text-blue-400">
                  <Share2 className="w-4 h-4" />
                </div>
                <div className="text-left leading-tight">
                  <p className="text-xs font-semibold text-white">AirDrop</p>
                  <p className="text-[10px] text-zinc-400 capitalize">{airDropMode}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </div>

            {/* Personal Hotspot */}
            <button
              onClick={togglePersonalHotspot}
              className={`p-3 rounded-2xl flex items-center gap-3 transition-all ${
                personalHotspot ? 'bg-emerald-500 text-white' : 'bg-white/10 text-zinc-300'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0">
                <Radio className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold">Hotspot</p>
                <p className="text-[10px] opacity-80">{personalHotspot ? 'Discoverable' : 'Off'}</p>
              </div>
            </button>
          </div>

          {/* VPN Row */}
          <div
            onClick={toggleVPN}
            className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
              vpnConnected ? 'bg-indigo-600/30 border border-indigo-500/40 text-white' : 'bg-white/10 text-zinc-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0 text-indigo-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold">VPN Security</p>
                <p className="text-[10px] text-zinc-400">WireGuard Enterprise Tunnel</p>
              </div>
            </div>
            <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              vpnConnected ? 'bg-indigo-500 text-white' : 'bg-white/10 text-zinc-400'
            }`}>
              {vpnConnected ? 'Connected' : 'Not Connected'}
            </div>
          </div>
        </div>
      )}

      {/* Sub-view: Wi-Fi Networks */}
      {activeSubTab === 'wifi' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/10 mb-2">
            <span className="text-xs font-semibold">Wi-Fi Power</span>
            <button
              onClick={toggleWifi}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                wifi ? 'bg-emerald-500' : 'bg-zinc-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${wifi ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 px-1">Known Networks</p>
          <div className="space-y-1.5">
            {WIFI_NETWORKS.map((net) => {
              const isSelected = wifi && activeWifiNetwork === net.name;
              return (
                <div
                  key={net.id}
                  onClick={() => setActiveWifiNetwork(net.name)}
                  className={`p-2.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-600/30 border-blue-500/50 text-white'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Wifi className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-zinc-400'}`} />
                    <span className="text-xs font-medium">{net.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {net.secure && <Lock className="w-3 h-3 text-zinc-400" />}
                    {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-view: Bluetooth Devices */}
      {activeSubTab === 'bluetooth' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/10 mb-2">
            <span className="text-xs font-semibold">Bluetooth Power</span>
            <button
              onClick={toggleBluetooth}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                bluetooth ? 'bg-blue-600' : 'bg-zinc-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${bluetooth ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 px-1">Paired Devices</p>
          <div className="space-y-1.5">
            {BT_DEVICES.map((dev) => {
              const isSelected = bluetooth && activeBluetoothDevice.includes(dev.name.slice(0, 7));
              return (
                <div
                  key={dev.id}
                  onClick={() => setActiveBluetoothDevice(dev.name)}
                  className={`p-2.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-600/30 border-blue-500/50 text-white'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Bluetooth className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-zinc-400'}`} />
                    <span className="text-xs font-medium">{dev.name}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-view: AirDrop Mode */}
      {activeSubTab === 'airdrop' && (
        <div className="space-y-2">
          <p className="text-xs text-zinc-400 mb-2">
            AirDrop allows instant discovery for sharing resumes, portfolio repos, and contact cards.
          </p>

          <div className="space-y-2">
            {[
              { id: 'off', label: 'Receiving Off', sub: 'No one can share files with you' },
              { id: 'contacts', label: 'Contacts Only', sub: 'Only known recruiters & teammates' },
              { id: 'everyone', label: 'Everyone for 10 Minutes', sub: 'Anyone nearby can request' }
            ].map((opt) => (
              <div
                key={opt.id}
                onClick={() => {
                  setAirDropMode(opt.id as any);
                  setActiveSubTab('main');
                }}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  airDropMode === opt.id
                    ? 'bg-blue-600/30 border-blue-500/50 text-white'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 text-zinc-300'
                }`}
              >
                <div>
                  <p className="text-xs font-semibold">{opt.label}</p>
                  <p className="text-[10px] text-zinc-400">{opt.sub}</p>
                </div>
                {airDropMode === opt.id && <Check className="w-4 h-4 text-blue-400" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
