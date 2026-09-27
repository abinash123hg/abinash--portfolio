import React from 'react';
import useSWR from 'swr';
import { WidgetSize } from '../../data/widgetsRegistry';
import { Sun, CloudSun, Wind, Droplets, MapPin, LocateFixed } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

const fetcher = (url: string) => fetch(url).then((response) => {
  if (!response.ok) throw new Error('Weather request failed');
  return response.json();
});

const weatherCodeLabel = (code: number) => {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Partly cloudy';
  if (code <= 48) return 'Foggy';
  if (code <= 67) return 'Rain';
  if (code <= 77) return 'Snow';
  if (code <= 82) return 'Showers';
  return 'Stormy';
};

const weatherIcon = (code: number, className: string) => {
  if (code === 0) return <Sun className={`${className} text-amber-500`} aria-hidden="true" />;
  if (code <= 3) return <CloudSun className={`${className} text-sky-500`} aria-hidden="true" />;
  return <Wind className={`${className} text-sky-500`} aria-hidden="true" />;
};

interface WeatherWidgetProps {
  size: WidgetSize;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ size }) => {
  const { theme } = useOSStore();
  const isDark = theme === 'dark';
  const [coordinates, setCoordinates] = React.useState<{ latitude: number; longitude: number } | null>(null);
  const [locationState, setLocationState] = React.useState<'loading' | 'ready' | 'denied'>('loading');

  React.useEffect(() => {
    if (!navigator.geolocation) {
      setLocationState('denied');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoordinates({ latitude: coords.latitude, longitude: coords.longitude });
        setLocationState('ready');
      },
      () => setLocationState('denied'),
      { enableHighAccuracy: false, maximumAge: 300000, timeout: 10000 }
    );
  }, []);

  const weatherUrl = coordinates
    ? `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=auto`
    : null;
  const locationUrl = coordinates
    ? `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&count=1&language=en&format=json`
    : null;
  const { data: weather } = useSWR(weatherUrl, fetcher, { refreshInterval: 900000, revalidateOnFocus: true });
  const { data: location } = useSWR(locationUrl, fetcher, { revalidateOnFocus: false });
  const current = weather?.current;
  const city = location?.results?.[0]?.name ?? (locationState === 'denied' ? 'Location unavailable' : 'Locating…');
  const condition = current ? weatherCodeLabel(current.weather_code) : 'Waiting for location';
  const temperature = current ? `${Math.round(current.temperature_2m)}°` : '--°';
  const high = weather?.daily?.temperature_2m_max?.[0];
  const low = weather?.daily?.temperature_2m_min?.[0];
  const humidity = current?.relative_humidity_2m;
  const wind = current?.wind_speed_10m;
  const primary = isDark ? 'text-white' : 'text-zinc-900';
  const muted = isDark ? 'text-zinc-400' : 'text-zinc-600';

  if (size === 'medium') {
    return (
      <div className="w-full h-full p-4 flex flex-col justify-between select-none">
        <div className="flex items-start justify-between">
          <div>
            <div className={`flex items-center gap-1 text-xs font-bold ${primary}`}>
              <MapPin className="w-3 h-3 text-sky-500" aria-hidden="true" />
              <span>{city}</span>
            </div>
            <div className={`text-xs ${muted}`}>{condition} • Live local forecast</div>
          </div>
          <div className="flex items-center gap-2">
            {weatherIcon(current?.weather_code ?? 0, 'w-6 h-6')}
            <span className={`text-2xl font-light ${primary}`}>{temperature}</span>
          </div>
        </div>

        <div className={`grid grid-cols-4 gap-2 text-center py-2 border-y my-1 ${isDark ? 'border-white/10' : 'border-zinc-200'}`}>
          <div>
            <span className={`text-[11px] block ${muted}`}>Now</span>
            {weatherIcon(current?.weather_code ?? 0, 'w-3.5 h-3.5 mx-auto my-0.5')}
            <span className={`text-xs font-semibold ${primary}`}>{temperature}</span>
          </div>
          <div>
            <span className={`text-[11px] block ${muted}`}>1 PM</span>
            <Sun className="w-3.5 h-3.5 mx-auto text-amber-500 my-0.5" aria-hidden="true" />
            <span className={`text-xs font-semibold ${primary}`}>{weather?.hourly?.temperature_2m?.[1] != null ? `${Math.round(weather.hourly.temperature_2m[1])}°` : '--°'}</span>
          </div>
          <div>
            <span className={`text-[11px] block ${muted}`}>4 PM</span>
            <CloudSun className="w-3.5 h-3.5 mx-auto text-sky-500 my-0.5" aria-hidden="true" />
            <span className={`text-xs font-semibold ${primary}`}>{weather?.hourly?.temperature_2m?.[4] != null ? `${Math.round(weather.hourly.temperature_2m[4])}°` : '--°'}</span>
          </div>
          <div>
            <span className={`text-[11px] block ${muted}`}>7 PM</span>
            <CloudSun className="w-3.5 h-3.5 mx-auto text-indigo-500 my-0.5" aria-hidden="true" />
            <span className={`text-xs font-semibold ${primary}`}>{weather?.hourly?.temperature_2m?.[7] != null ? `${Math.round(weather.hourly.temperature_2m[7])}°` : '--°'}</span>
          </div>
        </div>

        <div className={`flex items-center justify-between text-xs ${muted}`}>
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3 text-blue-500" aria-hidden="true" />
            <span>Humidity {humidity ?? '--'}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-3 h-3 text-teal-500" aria-hidden="true" />
            <span>Wind {wind != null ? `${Math.round(wind)} km/h` : '--'}</span>
          </div>
          <span>H: {high != null ? `${Math.round(high)}°` : '--'} L: {low != null ? `${Math.round(low)}°` : '--'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-3.5 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between">
        <span className={`text-xs font-bold ${primary}`}>{city}</span>
        {weatherIcon(current?.weather_code ?? 0, 'w-3.5 h-3.5')}
      </div>

      <div className="my-auto">
        <span className={`text-3xl font-light tracking-tighter ${primary}`}>{temperature}</span>
        <span className={`text-xs block mt-0.5 ${muted}`}>{condition}</span>
      </div>

      <div className={`flex items-center justify-between text-xs pt-1.5 border-t ${muted} ${isDark ? 'border-white/10' : 'border-zinc-200'}`}>
        <span>H: {high != null ? `${Math.round(high)}°` : '--'}</span>
        <span>L: {low != null ? `${Math.round(low)}°` : '--'}</span>
      </div>
    </div>
  );
};
