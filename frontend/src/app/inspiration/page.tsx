import { Sparkles } from "lucide-react";

export default function InspirationPage() {
  // Placeholder trending reels data (will be replaced by Apify/API data in Phase 2)
  const placeholderReels = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    category: ["Fast Cuts", "Talking Head", "Cinematic", "Montage", "Before/After"][
      i % 5
    ],
  }));

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-black">
          Inspiration
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Browse trending Instagram reels and save them as templates.
        </p>
      </div>

      {/* Filter bar placeholder */}
      <div className="mb-6 flex gap-2">
        {["All", "Fast Cuts", "Talking Head", "Cinematic", "Montage"].map(
          (filter) => (
            <button
              key={filter}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                filter === "All"
                  ? "border-black bg-black text-white"
                  : "border-neutral-300 text-neutral-500 hover:border-neutral-400"
              }`}
            >
              {filter}
            </button>
          )
        )}
      </div>

      {/* Reels Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderReels.map((reel) => (
          <div
            key={reel.id}
            className="group relative aspect-[9/16] overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100"
          >
            {/* Placeholder content */}
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-neutral-300" />
              <span className="text-xs text-neutral-400">Trending Reel</span>
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="mb-1 w-fit rounded-full bg-white/20 px-2 py-0.5 text-xs text-white">
                {reel.category}
              </span>
              <button className="mt-2 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-neutral-100">
                Use as template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
