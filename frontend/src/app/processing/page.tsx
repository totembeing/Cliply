import { Loader2 } from "lucide-react";

export default function ProcessingPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          <Loader2 className="h-12 w-12 animate-spin text-neutral-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-black" />
          </div>
        </div>

        <h1 className="text-xl font-semibold text-black">
          Generating your reel…
        </h1>
        <p className="mt-2 max-w-sm text-sm text-neutral-500">
          Our AI is analyzing your clips, matching trends, and editing your reel.
          This usually takes 1–3 minutes.
        </p>

        {/* Progress bar placeholder */}
        <div className="mt-8 w-full max-w-xs">
          <div className="mb-2 flex justify-between text-xs text-neutral-400">
            <span>Processing</span>
            <span>---%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full w-1/3 rounded-full bg-black transition-all duration-500"
              style={{ width: "33%" }}
            />
          </div>
        </div>

        <p className="mt-10 text-xs text-neutral-400">
          You can close this page — we&apos;ll notify you when it&apos;s ready.
        </p>
      </div>
    </div>
  );
}
