import Link from "next/link";
import { Film, Sparkles, Upload, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center md:py-32">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-500">
          <Zap className="h-3 w-3" />
          AI-powered reel generation
        </div>

        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-black md:text-5xl lg:text-6xl">
          Turn raw clips into
          <br />
          trending reels
        </h1>

        <p className="mt-4 max-w-md text-base text-neutral-500 md:text-lg">
          Cliply analyzes what&apos;s viral on Instagram and auto-edits your
          footage to match — captions, music, transitions, all included.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/auth/signup"
            className="rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Start free — 3 reels included
          </Link>
          <Link
            href="/auth/login"
            className="rounded-md border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Log in
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-neutral-200 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight text-black">
            How it works
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Sparkles className="h-5 w-5" />}
              title="1. Browse trends"
              description="See what's going viral on Instagram. Save trends you want to replicate."
            />
            <FeatureCard
              icon={<Upload className="h-5 w-5" />}
              title="2. Upload clips"
              description="Drop in your raw MP4 footage. Our AI figures out what to do with it."
            />
            <FeatureCard
              icon={<Film className="h-5 w-5" />}
              title="3. Get your reel"
              description="AI clips, captions, adds music, and exports a ready-to-post reel."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200 px-4 py-20">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-black">
            Ready to create?
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            No credit card required. Start with 3 free reel generations.
          </p>
          <Link
            href="/auth/signup"
            className="mt-6 rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Get started for free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 px-4 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="text-xs text-neutral-400">
            © 2026 Cliply. All rights reserved.
          </span>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-neutral-400 hover:text-black">
              Privacy
            </a>
            <a href="#" className="text-xs text-neutral-400 hover:text-black">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-200 p-6">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-black">
        {icon}
      </div>
      <h3 className="mb-1 text-sm font-semibold text-black">{title}</h3>
      <p className="text-sm leading-relaxed text-neutral-500">{description}</p>
    </div>
  );
}
