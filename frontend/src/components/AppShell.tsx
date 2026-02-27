"use client";

import { useAuth } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // Pages that should NOT show the sidebar (public pages)
  const publicPaths = ["/", "/auth"];
  const isPublic = publicPaths.some(
    (p) => pathname === p || (p !== "/" && pathname.startsWith(p))
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-black" />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <Navbar user={user ? { email: user.email } : null} />
      <div className="flex flex-1 overflow-hidden">
        {!isPublic && user && <Sidebar />}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
