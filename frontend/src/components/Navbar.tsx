"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Menu, X } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface NavbarProps {
  user: { email?: string } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/");
    router.refresh();
  };

  const isLanding = pathname === "/";

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <Film className="h-5 w-5 text-black" />
          <span className="text-lg font-semibold tracking-tight text-black">
            Cliply
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          {user ? (
            <>
              <NavLink href="/dashboard" current={pathname}>
                Dashboard
              </NavLink>
              <NavLink href="/inspiration" current={pathname}>
                Inspiration
              </NavLink>
              <NavLink href="/studio" current={pathname}>
                Studio
              </NavLink>
              <NavLink href="/drafts" current={pathname}>
                Drafts
              </NavLink>
              <button
                onClick={handleSignOut}
                className="ml-2 rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-100"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              {isLanding && (
                <>
                  <Link
                    href="/auth/login"
                    className="text-sm text-neutral-600 transition-colors hover:text-black"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="rounded-md bg-black px-4 py-1.5 text-sm text-white transition-colors hover:bg-neutral-800"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 pb-4 pt-2 md:hidden">
          {user ? (
            <div className="flex flex-col gap-3">
              <MobileLink href="/dashboard" onClick={() => setMobileOpen(false)}>
                Dashboard
              </MobileLink>
              <MobileLink href="/inspiration" onClick={() => setMobileOpen(false)}>
                Inspiration
              </MobileLink>
              <MobileLink href="/studio" onClick={() => setMobileOpen(false)}>
                Studio
              </MobileLink>
              <MobileLink href="/drafts" onClick={() => setMobileOpen(false)}>
                Drafts
              </MobileLink>
              <button
                onClick={handleSignOut}
                className="mt-2 w-full rounded-md border border-neutral-300 py-2 text-sm text-neutral-600"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <MobileLink href="/auth/login" onClick={() => setMobileOpen(false)}>
                Log in
              </MobileLink>
              <Link
                href="/auth/signup"
                onClick={() => setMobileOpen(false)}
                className="rounded-md bg-black py-2 text-center text-sm text-white"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

function NavLink({
  href,
  current,
  children,
}: {
  href: string;
  current: string;
  children: React.ReactNode;
}) {
  const isActive = current.startsWith(href);
  return (
    <Link
      href={href}
      className={`text-sm transition-colors ${
        isActive
          ? "font-medium text-black"
          : "text-neutral-500 hover:text-black"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-sm text-neutral-600 hover:text-black"
    >
      {children}
    </Link>
  );
}
