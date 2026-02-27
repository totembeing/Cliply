import { Download, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function ResultPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-black">
          Your reel is ready
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Preview it below, then download or regenerate.
        </p>
      </div>

      {/* Video preview placeholder */}
      <div className="mx-auto mb-8 aspect-[9/16] max-w-xs overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-neutral-400">Video preview</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button className="flex items-center justify-center gap-2 rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
          <Download className="h-4 w-4" />
          Download MP4
        </button>
        <button className="flex items-center justify-center gap-2 rounded-md border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50">
          <RotateCcw className="h-4 w-4" />
          Regenerate
        </button>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/drafts"
          className="text-xs text-neutral-500 hover:text-black"
        >
          View all drafts →
        </Link>
      </div>
    </div>
  );
}
