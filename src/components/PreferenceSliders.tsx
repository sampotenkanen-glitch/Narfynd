"use client";
import { Weights, normaliseWeights } from "@/lib/clientScoring";

interface Props {
  weights: Weights;
  onChange: (w: Weights) => void;
}

const sliders: { key: keyof Weights; label: string; emoji: string }[] = [
  { key: "cost", label: "Cheaper trips", emoji: "💸" },
  { key: "co2", label: "Greener trips", emoji: "🌿" },
  { key: "weather", label: "Better weather", emoji: "☀️" },
];

export default function PreferenceSliders({ weights, onChange }: Props) {
  const handle = (key: keyof Weights, raw: number) => {
    onChange(normaliseWeights(key, raw / 100, weights));
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/70 backdrop-blur-sm border border-[#25cfc9]/20 rounded-2xl p-6 shadow-md flex flex-col gap-5">
      <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
        What matters most?
      </p>

      {sliders.map(({ key, label, emoji }) => {
        const pct = Math.round(weights[key] * 100);
        return (
          <div key={key} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">
                {emoji} {label}
              </span>
              <span className="text-sm font-bold text-[#25cfc9] w-10 text-right">
                {pct}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={pct}
              onChange={(e) => handle(key, Number(e.target.value))}
              className="accent-[#25cfc9] w-full h-2 cursor-pointer"
            />
          </div>
        );
      })}

      <p className="text-xs text-slate-400 text-right">
        Weights auto-balance to 100%
      </p>
    </div>
  );
}
