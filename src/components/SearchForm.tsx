"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormValues = {
  origin: string;
  startDate: string;
  endDate: string;
  budget: number;
  maxDistance: number;
};

export default function SearchForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { maxDistance: 500 },
  });

  const onSubmit = (data: FormValues) => {
    const params = new URLSearchParams({
      origin: data.origin,
      startDate: data.startDate,
      endDate: data.endDate,
      budget: String(data.budget),
      maxDistance: String(data.maxDistance),
    });
    router.push(`/results?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xl mx-auto flex flex-col gap-5 bg-white/70 backdrop-blur-sm border border-[#25cfc9]/20 rounded-2xl p-8 shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-[#1a8f8c] tracking-tight">
        Find your eco escape
      </h2>

      {/* Origin */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-600">Origin city</label>
        <input
          {...register("origin", { required: "Origin city is required" })}
          placeholder="e.g. Rotterdam"
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#25cfc9] transition"
        />
        {errors.origin && (
          <span className="text-xs text-red-500">{errors.origin.message}</span>
        )}
      </div>

      {/* Dates */}
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm font-medium text-slate-600">Start date</label>
          <input
            type="date"
            {...register("startDate", { required: "Required" })}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#25cfc9] transition"
          />
          {errors.startDate && (
            <span className="text-xs text-red-500">{errors.startDate.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm font-medium text-slate-600">End date</label>
          <input
            type="date"
            {...register("endDate", { required: "Required" })}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#25cfc9] transition"
          />
          {errors.endDate && (
            <span className="text-xs text-red-500">{errors.endDate.message}</span>
          )}
        </div>
      </div>

      {/* Budget */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-600">Budget (EUR)</label>
        <input
          type="number"
          min={0}
          {...register("budget", {
            required: "Budget is required",
            min: { value: 1, message: "Must be at least €1" },
          })}
          placeholder="e.g. 400"
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#25cfc9] transition"
        />
        {errors.budget && (
          <span className="text-xs text-red-500">{errors.budget.message}</span>
        )}
      </div>

      {/* Max Distance slider */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-600">Max distance</label>
        <input
          type="range"
          min={100}
          max={2000}
          step={50}
          {...register("maxDistance")}
          className="accent-[#25cfc9] w-full"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>100 km</span>
          <span>2000 km</span>
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-xl bg-[#25cfc9] hover:bg-[#1db8b2] text-white font-semibold py-3 transition-colors shadow-md shadow-[#25cfc9]/30"
      >
        Search destinations →
      </button>
    </form>
  );
}
