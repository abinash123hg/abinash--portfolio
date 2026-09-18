import React from 'react';
import {
  Wifi,
  WifiOff,
  Bluetooth,
  Plane,
  Radio,
  Share2,
  Lock,
  Check,
  ShieldCheck,
  Smartphone,
  Headphones,
  Laptop
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

const WIFI_NETWORKS = [
  { id: 'cutm-5g', name: 'Abinash-Fiber-5G', secure: true, connected: true, speed: '850 Mbps' },
  { id: 'campus', name: 'CUTM-Campus-WiFi', secure: true, connected: false, speed: '120 Mbps' },
  { id: 'starlink', name: 'Starlink-Satellite', secure: true, connected: false, speed: '240 Mbps' }
];

const BLUETOOTH_DEVICES = [
  { id: 'airpods', name: 'AirPods Pro (2nd Gen)', type: Headphones, connected: true },
  { id: 'macbook', name: 'MacBook Pro M3 Max', type: Laptop, connected: false },
  { id: 'phone', name: 'iPhone 15 Pro Testbed', type: Smartphone, connected: false }
];

export const ConnectivityPage: React.FC = () => {
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

  return (
    <div className="w-full flex-1 flex flex-col space-y-3.5 max-w-[340px] mx-auto overflow-y-auto no-scrollbar pb-16 select-none">
      {/* 4 Primary Toggles */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={toggleAirplaneMode}
          className={`p-3 rounded-2xl flex items-center gap-3 transition-all ${
            airplaneMode ? 'bg-amber-500 text-white' : 'bg-zinc-900/80 border border-white/10 text-zinc-300'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-black/20 flex items-center justify-center shrink-0">
            <Plane className="w-5 h-5" />
          </div>
          <div className="text-left leading-tight">
            <p className="text-xs font-bold">Airplane Mode</p>
            <p className="text-[10px] opacity-70">{airplaneMode ? 'Enabled' : 'Disabled'}</p>
          </div>
        </button>

        <button
          onClick={toggleCellularData}
          disabled={airplaneMode}
          className={`p-3 rounded-2xl flex items-center gap-3 transition-all ${
            cellularData && !airplaneMode
              ? 'bg-emerald-500 text-white'
              : 'bg-zinc-900/80 border border-white/10 text-zinc-400 opacity-60'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-black/20 flex items-center justify-center shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <div className="text-left leading-tight">
            <p className="text-xs font-bold">Cellular</p>
            <p className="text-[10px] opacity-70">{cellularData && !airplaneMode ? '5G UC Active' : 'Off'}</p>
          </div>
        </button>

        <button
          onClick={toggleWifi}
          className={`p-3 rounded-2xl flex items-center gap-3 transition-all ${
            wifi ? 'bg-blue-600 text-white' : 'bg-zinc-900/80 border border-white/10 text-zinc-300'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-black/20 flex items-center justify-center shrink-0">
            {wifi ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
          </div>
          <div className="text-left leading-tight truncate">
            <p className="text-xs font-bold">Wi-Fi</p>
            <p className="text-[10px] opacity-70 truncate">{wifi ? activeWifiNetwork : 'Off'}</p>
          </div>
        </button>

        <button
          onClick={toggleBluetooth}
          className={`p-3 rounded-2xl flex items-center gap-3 transition-all ${
            bluetooth ? 'bg-blue-600 text-white' : 'bg-zinc-900/80 border border-white/10 text-zinc-300'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-black/20 flex items-center justify-center shrink-0">
            <Bluetooth className="w-5 h-5" />
          </div>
          <div className="text-left leading-tight truncate">
            <p className="text-xs font-bold">Bluetooth</p>
            <p className="text-[10px] opacity-70 truncate">{bluetooth ? 'On' : 'Off'}</p>
          </div>
        </button>
      </div>

      {/* Wi-Fi Available Section */}
      <div className="p-3 rounded-2xl bg-zinc-900/80 border border-white/10 text-white space-y-2">
        <div className="flex items-center justify-between pb-1 border-b border-white/10">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Wi-Fi Networks</span>
          <span className="text-[10px] text-blue-400 font-semibold">{wifi ? 'Searching...' : 'Disconnected'}</span>
        </div>

        {wifi && (
          <div className="space-y-1.5 pt-1">
            {WIFI_NETWORKS.map((n) => {
              const isSelected = activeWifiNetwork === n.name;
              return (
                <div
                  key={n.id}
                  onClick={() => setActiveWifiNetwork(n.name)}
                  className={`p-2 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    isSelected ? 'bg-blue-600/30 border border-blue-500/50' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Wifi className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-zinc-400'}`} />
                    <div>
                      <p className="text-xs font-semibold text-white">{n.name}</p>
                      <p className="text-[10px] text-zinc-400">{n.speed}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {n.secure && <Lock className="w-3 h-3 text-zinc-400" />}
                    {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bluetooth Devices */}
      <div className="p-3 rounded-2xl bg-zinc-900/80 border border-white/10 text-white space-y-2">
        <div className="flex items-center justify-between pb-1 border-b border-white/10">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Bluetooth Devices</span>
          <span className="text-[10px] text-blue-400 font-semibold">{bluetooth ? 'Connected' : 'Off'}</span>
        </div>

        {bluetooth && (
          <div className="space-y-1.5 pt-1">
            {BLUETOOTH_DEVICES.map((d) => {
              const isSelected = activeBluetoothDevice.includes(d.name.slice(0, 7));
              const Icon = d.type;
              return (
                <div
                  key={d.id}
                  onClick={() => setActiveBluetoothDevice(d.name)}
                  className={`p-2 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    isSelected ? 'bg-blue-600/30 border border-blue-500/50' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-zinc-400'}`} />
                    <p className="text-xs font-semibold text-white">{d.name}</p>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* AirDrop & Hotspot & VPN */}
      <div className="grid grid-cols-2 gap-2.5">
        <div
          onClick={() => {
            const next = airDropMode === 'off' ? 'contacts' : airDropMode === 'contacts' ? 'everyone' : 'off';
            setAirDropMode(next);
          }}
          className="p-3 rounded-2xl bg-zinc-900/80 border border-white/10 text-white cursor-pointer hover:bg-zinc-850"
        >
          <div className="flex items-center gap-2 text-blue-400 mb-1">
            <Share2 className="w-4 h-4" />
            <span className="text-xs font-bold">AirDrop</span>
          </div>
          <p className="text-[11px] text-zinc-300 capitalize">{airDropMode}</p>
        </div>

        <div
          onClick={togglePersonalHotspot}
          className={`p-3 rounded-2xl border transition-all cursor-pointer ${
            personalHotspot
              ? 'bg-emerald-600/30 border-emerald-500/50 text-white'
              : 'bg-zinc-900/80 border-white/10 text-zinc-300 hover:bg-zinc-850'
          }`}
        >
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <Radio className="w-4 h-4" />
            <span className="text-xs font-bold">Hotspot</span>
          </div>
          <p className="text-[11px] text-zinc-300">{personalHotspot ? 'Discoverable' : 'Off'}</p>
        </div>
      </div>

      {/* VPN Enterprise */}
      <div
        onClick={toggleVPN}
        className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
          vpnConnected
            ? 'bg-indigo-600/30 border-indigo-500/50 text-white'
            : 'bg-zinc-900/80 border-white/10 text-zinc-300 hover:bg-zinc-850'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <h4 className="text-xs font-bold text-white">VPN Security</h4>
            <p className="text-[10px] text-zinc-400">WireGuard Enterprise Protocol</p>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          vpnConnected ? 'bg-indigo-500 text-white' : 'bg-white/10 text-zinc-400'
        }`}>
          {vpnConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
    </div>
  );
};
