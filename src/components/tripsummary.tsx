import React from "react";
import type { Destination } from "./destinationcard";

type Props = {
  d: Destination | null;
};

const money = (value: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);

const getUpdatedLabel = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";
  return date.toLocaleString();
};

export function TripSummary({ d }: Props) {
  if (!d) return null;

  return (
    <aside className="fade-in mt-4 rounded-3xl border border-white/60 bg-white p-5 shadow-[0_16px_40px_-24px_rgba(19,84,91,0.42)] sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-2xl font-bold text-slate-900">Trip Summary: {d.city}</h2>
        {d.tag === "Hidden Gems" && (
          <span className="rounded-full bg-[#f3f5ff] px-3 py-1 text-xs font-semibold text-[#5862b4] shadow-sm">
            ✨ Hidden Gem
          </span>
        )}
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-teal-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-teal-600">CO2 footprint</p>
          <p className="text-2xl font-bold text-teal-700">{d.co2Kg} kg</p>
        </div>
        <div className="rounded-2xl bg-sky-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-sky-600">Total price</p>
          <p className="text-2xl font-bold text-sky-700">{money(d.totalPrice, d.currency)}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Weather</p>
          <p className="text-sm font-semibold text-slate-700">{d.weatherSummary}</p>
        </div>
      </div>

      {d.transportOptions?.length ? (
        <div className="mb-4">
          <h3 className="mb-2 font-semibold text-slate-800">Transport options</h3>
          <div className="space-y-2">
            {d.transportOptions.map((t) => (
              <div
                key={`${t.mode}-${t.durationH}-${t.price}-${t.co2Kg}`}
                className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-700"
              >
                <span className="w-20 font-medium capitalize">{t.mode}</span>
                <span className="text-slate-400">·</span>
                <span>{t.durationH}h</span>
                <span className="text-slate-400">·</span>
                <span>{money(t.price, d.currency)}</span>
                <span className="text-slate-400">·</span>
                <span className="text-teal-600">{t.co2Kg} kg CO2</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {d.accommodationOptions?.length ? (
        <div className="mb-4">
          <h3 className="mb-2 font-semibold text-slate-800">Accommodation options</h3>
          <div className="space-y-2">
            {d.accommodationOptions.map((a) => (
              <div
                key={`${a.type}-${a.pricePerNight}-${a.rating}`}
                className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-700"
              >
                <span className="w-28 font-medium">{a.type}</span>
                <span className="text-slate-400">·</span>
                <span>{money(a.pricePerNight, d.currency)}/night</span>
                <span className="text-slate-400">·</span>
                <span>{a.rating.toFixed(1)} rating</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <p className="text-xs text-slate-400">Last updated: {getUpdatedLabel(d.lastUpdated)}</p>
    </aside>
  );
}