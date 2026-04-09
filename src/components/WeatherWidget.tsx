import type { WeatherForecast } from '@/lib/types';

interface Props {
  forecast: WeatherForecast;
}

function comfortLabel(score: number) {
  if (score >= 80) return { label: 'Great', color: 'text-emerald-600' };
  if (score >= 60) return { label: 'Good', color: 'text-primary' };
  if (score >= 40) return { label: 'Fair', color: 'text-amber-500' };
  return { label: 'Poor', color: 'text-red-400' };
}

export default function WeatherWidget({ forecast }: Props) {
  const { label, color } = comfortLabel(forecast.comfortScore);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">5-day forecast</p>
        <span className={`text-xs font-bold ${color}`}>
          Comfort {forecast.comfortScore}/100 — {label}
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {forecast.daily.map((day, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1 bg-slate-50 rounded-xl px-3 py-2 min-w-[64px] shrink-0"
          >
            <span className="text-xs text-slate-400 font-medium">
              {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
            </span>
            <span className="text-base">
              {day.rainProbability > 0.5 ? '🌧️' : day.tempHighC > 25 ? '☀️' : '⛅'}
            </span>
            <span className="text-xs font-bold text-slate-700">{day.tempHighC}°</span>
            <span className="text-xs text-slate-400">{day.tempLowC}°</span>
            <span className="text-xs text-sky-500">{Math.round(day.rainProbability * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
