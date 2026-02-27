import { Upload, Link as LinkIcon } from "lucide-react";

export default function StudioPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-black">
          Upload Studio
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Upload your raw clips and we&apos;ll turn them into a reel.
        </p>
      </div>

      {/* Upload Area */}
      <div className="mb-6 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-12 transition-colors hover:border-neutral-400">
        <Upload className="mb-3 h-8 w-8 text-neutral-400" />
        <p className="text-sm font-medium text-neutral-600">
          Drag & drop your MP4 clips here
        </p>
        <p className="mt-1 text-xs text-neutral-400">
          or click to browse · MP4 only · max 500MB per file
        </p>
      </div>

      {/* Uploaded clips placeholder */}
      <div className="mb-8">
        <h2 className="mb-3 text-sm font-medium text-neutral-400 uppercase tracking-wide">
          Uploaded clips
        </h2>
        <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center">
          <p className="text-sm text-neutral-400">
            No clips uploaded yet. Add some clips above to get started.
          </p>
        </div>
      </div>

      {/* Reference Reel (Optional) */}
      <div className="mb-8">
        <h2 className="mb-3 text-sm font-medium text-neutral-400 uppercase tracking-wide">
          Reference reel{" "}
          <span className="normal-case text-neutral-300">(optional)</span>
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-neutral-300 px-3 py-2">
            <LinkIcon className="h-4 w-4 text-neutral-400" />
            <input
              type="url"
              placeholder="Paste an Instagram reel URL…"
              className="flex-1 text-sm outline-none placeholder:text-neutral-400"
              disabled
            />
          </div>
        </div>
        <p className="mt-1.5 text-xs text-neutral-400">
          Share a reel link and we&apos;ll replicate its style with your clips.
        </p>
      </div>

      {/* Generate Button */}
      <button
        disabled
        className="w-full rounded-md bg-black py-3 text-sm font-medium text-white opacity-50"
      >
        Generate Reel — coming in Phase 4
      </button>
    </div>
  );
}
