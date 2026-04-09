export default function SkeletonCard() {
  return (
    <article className="fade-in overflow-hidden rounded-3xl border border-white/60 bg-white shadow-card-sm">
      <div className="shimmer h-44 sm:h-52" />
      <div className="space-y-3 p-5 sm:p-6">
        <div className="shimmer h-6 w-1/2 rounded-lg" />
        <div className="shimmer h-4 w-1/3 rounded-lg" />
        <div className="grid grid-cols-2 gap-3">
          <div className="shimmer h-20 rounded-2xl" />
          <div className="shimmer h-20 rounded-2xl" />
        </div>
        <div className="shimmer h-4 w-2/3 rounded-lg" />
        <div className="shimmer h-3 w-1/2 rounded-lg" />
      </div>
    </article>
  );
}
