import { Film, Sparkles, Upload, FileVideo } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const user = supabase
    ? (await supabase.auth.getUser()).data.user
    : null;

  // MVP: hardcoded trial count (will come from DB later)
  const trialsRemaining = 3;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* Welcome */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-black">
          Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Here&apos;s an overview of your workspace.
        </p>
      </div>

      {/* Trial Banner */}
      <div className="mb-8 rounded-lg border border-neutral-200 bg-neutral-50 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-black">Free Trial</p>
            <p className="mt-0.5 text-xs text-neutral-500">
              You have{" "}
              <span className="font-semibold text-black">
                {trialsRemaining} reel generations
              </span>{" "}
              remaining.
            </p>
          </div>
          <Link
            href="/subscription"
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-white"
          >
            Upgrade
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="mb-4 text-sm font-medium text-neutral-400 uppercase tracking-wide">
        Quick actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickAction
          href="/inspiration"
          icon={<Sparkles className="h-5 w-5" />}
          title="Browse Trends"
          description="See what's viral on Instagram right now"
        />
        <QuickAction
          href="/studio"
          icon={<Upload className="h-5 w-5" />}
          title="Create a Reel"
          description="Upload clips and generate a new reel"
        />
        <QuickAction
          href="/drafts"
          icon={<FileVideo className="h-5 w-5" />}
          title="My Drafts"
          description="View your saved and generated reels"
        />
      </div>

      {/* Recent Activity */}
      <div className="mt-12">
        <h2 className="mb-4 text-sm font-medium text-neutral-400 uppercase tracking-wide">
          Recent activity
        </h2>
        <div className="rounded-lg border border-dashed border-neutral-300 p-10 text-center">
          <Film className="mx-auto mb-2 h-6 w-6 text-neutral-300" />
          <p className="text-sm text-neutral-400">
            No reels generated yet. Start by browsing trends or uploading clips.
          </p>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-neutral-200 p-5 transition-colors hover:border-neutral-400"
    >
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-600 transition-colors group-hover:bg-black group-hover:text-white">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-black">{title}</h3>
      <p className="mt-0.5 text-xs text-neutral-500">{description}</p>
    </Link>
  );
}
