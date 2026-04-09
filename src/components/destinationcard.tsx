import React, { type ReactNode } from "react";

type TransportOption = { mode: string; durationH: number; price: number; co2Kg: number };
type AccommodationOption = { type: string; pricePerNight: number; rating: number };

export type Destination = {
  city: string;
  region?: string;
  imageUrl?: string;
  tag?: string;
  co2Kg: number;
  totalPrice: number;
  weatherSummary: string;
  rating?: number;
  nights?: number;
  currency?: string;
  lastUpdated: string;
  transportOptions?: TransportOption[];
  accommodationOptions?: AccommodationOption[];
};

const money = (value: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);

const getUpdatedLabel = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";
  return date.toLocaleString();
};

function IconLeaf() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 4c-6.5.3-11.8 3.2-14.8 8.4a8 8 0 0 0 0 7.6" />
      <path d="M4.5 19.5c3-1 6.3-3.5 9.8-7.5" />
    </svg>
  );
}

function IconWallet() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M15 12h3" />
      <circle cx="17.5" cy="12" r=".7" fill="currentColor" />
    </svg>
  );
}

export function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-bg px-4 py-6 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  );
}

export function DestinationCard({ d }: { d: Destination }) {
  return (
    <article className="fade-in overflow-hidden rounded-3xl border border-white/60 bg-white shadow-[0_18px_50px_-28px_rgba(19,84,91,0.45)] transition-transform duration-300 hover:-translate-y-0.5">
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-cyan-100 via-teal-100 to-emerald-100 sm:h-52">
        {d.imageUrl ? <img src={d.imageUrl} alt={d.city} className="h-full w-full object-cover" /> : null}
        <span className="absolute left-4 top-4 rounded-full bg-[#f3f5ff] px-3 py-1 text-xs font-semibold text-[#5862b4] shadow-sm">
          {d.tag ?? "Hidden Gems"}
        </span>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">{d.city}</h3>
            <p className="mt-1 text-sm text-slate-500">{d.region ?? "Curated eco destination"}</p>
          </div>
          <div className="rounded-xl bg-slate-50 px-2.5 py-1 text-sm font-medium text-slate-700">★ {d.rating ?? 4.8}</div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-cyan-50/80 p-3">
            <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-slate-500">
              <IconLeaf />
              CO2 footprint
            </p>
            <p className="mt-1 text-lg font-semibold text-cyan-700">{d.co2Kg} kg</p>
          </div>
          <div className="rounded-2xl bg-teal-50/90 p-3">
            <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-slate-500">
              <IconWallet />
              Estimated price
            </p>
            <p className="mt-1 text-lg font-semibold text-teal-700">{money(d.totalPrice, d.currency)}</p>
          </div>
        </div>

        <p className="text-sm text-slate-600">{d.weatherSummary}</p>
        <p className="text-xs text-slate-400">Last updated: {getUpdatedLabel(d.lastUpdated)}</p>
      </div>
    </article>
  );
}

export function DestinationCardSkeleton() {
  return (
    <article className="fade-in overflow-hidden rounded-3xl border border-white/60 bg-white shadow-[0_12px_35px_-24px_rgba(19,84,91,0.4)]">
      <div className="shimmer h-44 sm:h-52" />
      <div className="space-y-3 p-5 sm:p-6">
        <div className="shimmer h-6 w-1/2 rounded-lg" />
        <div className="shimmer h-4 w-1/3 rounded-lg" />
        <div className="grid grid-cols-2 gap-3">
          <div className="shimmer h-20 rounded-2xl" />
          <div className="shimmer h-20 rounded-2xl" />
        </div>
        <div className="shimmer h-4 w-2/3 rounded-lg" />
      </div>
    </article>
  );
}

export function TripSummary({ d }: { d: Destination | null }) {
  if (!d) return null;
  const bestTransport = d.transportOptions?.[0];
  const bestStay = d.accommodationOptions?.[0];
  return (
    <aside className="fade-in rounded-3xl border border-white/60 bg-white p-5 shadow-[0_16px_40px_-24px_rgba(19,84,91,0.42)] sm:p-6">
      <h3 className="text-lg font-semibold text-slate-900">Trip Summary</h3>
      <p className="mt-1 text-sm text-slate-600">
        Selected destination: <span className="font-medium">{d.city}</span>
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-cyan-50 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Total cost</p>
          <p className="text-lg font-semibold text-cyan-700">{money(d.totalPrice, d.currency)}</p>
        </div>
        <div className="rounded-2xl bg-teal-50 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Total CO2 (est.)</p>
          <p className="text-lg font-semibold text-teal-700">{d.co2Kg} kg</p>
        </div>
      </div>

      <div className="mt-4 space-y-1 text-sm text-slate-700">
        <p>Weather: {d.weatherSummary}</p>
        {bestTransport ? (
          <p>
            Best transport: <span className="font-medium capitalize">{bestTransport.mode}</span> ({bestTransport.durationH}h,{" "}
            {money(bestTransport.price, d.currency)}, {bestTransport.co2Kg}kg CO2)
          </p>
        ) : null}
        {bestStay ? (
          <p>
            Stay: <span className="font-medium">{bestStay.type}</span> ({money(bestStay.pricePerNight, d.currency)}/night,{" "}
            {bestStay.rating.toFixed(1)} rating)
          </p>
        ) : null}
      </div>

      <p className="mt-4 text-xs text-slate-400">Last updated: {getUpdatedLabel(d.lastUpdated)}</p>
    </aside>
  );
}

export function TripSummarySkeleton() {
  return (
    <aside className="fade-in rounded-3xl border border-white/60 bg-white p-5 shadow-[0_16px_40px_-24px_rgba(19,84,91,0.42)] sm:p-6">
      <div className="shimmer h-6 w-1/2 rounded-lg" />
      <div className="mt-3 shimmer h-4 w-2/3 rounded-lg" />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="shimmer h-20 rounded-2xl" />
        <div className="shimmer h-20 rounded-2xl" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="shimmer h-4 w-full rounded-lg" />
        <div className="shimmer h-4 w-5/6 rounded-lg" />
      </div>
    </aside>
  );
}

