import type { AccommodationOption } from '@/lib/types';

const typeLabel: Record<string, string> = {
  hotel: 'Hotel',
  airbnb: 'Airbnb',
  hidden_gem: 'Hidden gem',
};

interface Props {
  options: AccommodationOption[];
}

export default function AccommodationOptions({ options }: Props) {
  if (options.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Accommodation</p>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => (
          <div
            key={i}
            className="flex items-start justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3"
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-800">{opt.name}</span>
                {opt.isHiddenGem && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                    ✦ Hidden gem
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400">{opt.locationDescription}</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                  {typeLabel[opt.type] ?? opt.type}
                </span>
                <span className="text-xs text-slate-500">★ {opt.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-slate-800">€{opt.pricePerNight}</p>
              <p className="text-xs text-slate-400">/ night</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
