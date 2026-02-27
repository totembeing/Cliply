import { Check } from "lucide-react";

export default function SubscriptionPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-black">
          Subscription
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Upgrade to unlock unlimited reel generations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Free Plan */}
        <div className="rounded-lg border border-neutral-200 p-6">
          <h2 className="text-sm font-medium text-neutral-500">Free</h2>
          <div className="mt-2 mb-4">
            <span className="text-3xl font-bold text-black">$0</span>
            <span className="text-sm text-neutral-400"> / forever</span>
          </div>
          <ul className="flex flex-col gap-2.5">
            <PlanFeature>3 reel generations</PlanFeature>
            <PlanFeature>Basic music library</PlanFeature>
            <PlanFeature>720p export</PlanFeature>
            <PlanFeature>Auto captions</PlanFeature>
          </ul>
          <button
            disabled
            className="mt-6 w-full rounded-md border border-neutral-300 py-2.5 text-sm font-medium text-neutral-400"
          >
            Current plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="rounded-lg border-2 border-black p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-black">Pro</h2>
            <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white">
              Popular
            </span>
          </div>
          <div className="mt-2 mb-4">
            <span className="text-3xl font-bold text-black">$19</span>
            <span className="text-sm text-neutral-400"> / month</span>
          </div>
          <ul className="flex flex-col gap-2.5">
            <PlanFeature>Unlimited reel generations</PlanFeature>
            <PlanFeature>Priority processing</PlanFeature>
            <PlanFeature>Premium music library</PlanFeature>
            <PlanFeature>1080p export</PlanFeature>
            <PlanFeature>Reference reel mode</PlanFeature>
          </ul>
          <button
            disabled
            className="mt-6 w-full rounded-md bg-black py-2.5 text-sm font-medium text-white opacity-50"
          >
            Coming soon — Stripe integration
          </button>
        </div>
      </div>
    </div>
  );
}

function PlanFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-sm text-neutral-600">
      <Check className="h-3.5 w-3.5 text-black" />
      {children}
    </li>
  );
}
