import { CardSkeleton } from "@/components/cardskeleton";
import { DestinationCard, GlobalLayout, type Destination } from "@/components/destinationcard";
import { TripSummary } from "@/components/tripsummary";

const destination: Destination = {
  city: "Porto",
  region: "Portugal",
  imageUrl:
    "https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1200&q=80",
  tag: "Hidden Gems",
  co2Kg: 118,
  totalPrice: 860,
  weatherSummary: "Mild ocean breeze, 21C afternoons, low rain probability.",
  rating: 4.8,
  currency: "USD",
  lastUpdated: new Date().toISOString(),
  transportOptions: [
    { mode: "train", durationH: 9, price: 180, co2Kg: 24 },
    { mode: "flight", durationH: 3, price: 240, co2Kg: 126 },
  ],
  accommodationOptions: [
    { type: "Boutique Hotel", pricePerNight: 145, rating: 4.7 },
    { type: "Eco Hostel", pricePerNight: 68, rating: 4.3 },
  ],
};

export default function Home() {
  return (
    <GlobalLayout>
      <section className="mb-6">
        <p className="text-sm uppercase tracking-[0.24em] text-primary">EcoEscape</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Curated trips with style and lower impact
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Compare destination quality, footprint, and cost at a glance.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DestinationCard d={destination} />
        </div>
        <div>
          <TripSummary d={destination} />
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <CardSkeleton />
        <CardSkeleton />
      </section>
    </GlobalLayout>
  );
}
