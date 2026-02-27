"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  Upload,
  FileVideo,
  CreditCard,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inspiration", label: "Inspiration", icon: Sparkles },
  { href: "/studio", label: "Studio", icon: Upload },
  { href: "/drafts", label: "Drafts", icon: FileVideo },
  { href: "/subscription", label: "Subscription", icon: CreditCard },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 border-r border-neutral-200 bg-neutral-50 lg:block">
      <nav className="flex flex-col gap-1 p-3 pt-6">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-neutral-200/70 font-medium text-black"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-black"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
