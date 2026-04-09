import type { TransportOption } from '@/lib/types';

const modeIcon: Record<string, string> = {
  train: '🚆',
  bus: '🚌',
  carpool: '🚗',
  flight: '✈️',
};

const modeBadge: Record<string, string> = {
  train: 'bg-emerald-100 text-emerald-700',
  bus: 'bg-sky-100 text-sky-700',
  carpool: 'bg-violet-100 text-violet-700',
  flight: 'bg-orange-100 text-orange-700',
};

interface Props {
  options: TransportOption[];
}

export default function TransportOptions({ options }: Props) {
  if (options.length === 0) return null;
  const sorted = [...options].sort((a, b) => a.co2Kg - b.co2Kg);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Transport options</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-400 border-b border-slate-100">
              <th className="text-left pb-2 font-medium">Mode</th>
              <th className="text-right pb-2 font-medium">Duration</th>
              <th className="text-right pb-2 font-medium">Price</th>
              <th className="text-right pb-2 font-medium">CO₂</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((opt, i) => (
              <tr
                key={i}
                className={`border-b border-slate-50 ${i === 0 ? 'bg-primary-light/40' : ''}`}
              >
                <td className="py-2 pr-3">
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${modeBadge[opt.mode] ?? 'bg-slate-100 text-slate-600'}`}>
                    {modeIcon[opt.mode]} {opt.mode}
                    {i === 0 && <span className="ml-1 text-primary font-bold">✓</span>}
                  </span>
                </td>
                <td className="py-2 text-right text-slate-600">
                  {Math.floor(opt.durationMinutes / 60)}h {opt.durationMinutes % 60}m
                </td>
                <td className="py-2 text-right text-slate-600">€{opt.priceUSD}</td>
                <td className="py-2 text-right">
                  <span className={`font-medium ${i === 0 ? 'text-primary' : 'text-slate-600'}`}>
                    {opt.co2Kg} kg
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-400">✓ Lowest emission option highlighted</p>
    </div>
  );
}
