import { FileVideo } from "lucide-react";
import Link from "next/link";

export default function DraftsPage() {
  // Placeholder — will be replaced with real data from DB
  const drafts: { id: string; status: string; date: string }[] = [];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-black">
            My Drafts
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Your saved and generated reels.
          </p>
        </div>
        <Link
          href="/studio"
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          New reel
        </Link>
      </div>

      {drafts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 p-16 text-center">
          <FileVideo className="mx-auto mb-3 h-8 w-8 text-neutral-300" />
          <p className="text-sm text-neutral-500">No drafts yet.</p>
          <p className="mt-1 text-xs text-neutral-400">
            Generated reels will appear here.
          </p>
          <Link
            href="/studio"
            className="mt-4 inline-block rounded-md border border-neutral-300 px-4 py-2 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
          >
            Go to Studio
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="rounded-lg border border-neutral-200 p-4"
            >
              <div className="mb-3 aspect-[9/16] rounded bg-neutral-100" />
              <p className="text-xs text-neutral-500">{draft.date}</p>
              <span className="mt-1 inline-block rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">
                {draft.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
