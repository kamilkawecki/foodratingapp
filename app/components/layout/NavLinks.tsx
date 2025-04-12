"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/lib/context/UserContext";
import { NavLink } from "@/types/nav";
import { getAuthLabel } from "@/lib/utils/nav";

export default function NavLinks({ navLinks }: { navLinks: NavLink[] }) {
  const pathname = usePathname();
  const { user, displayName } = useUser();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="hidden md:flex flex-col md:flex-row gap-4 md:gap-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`transition ${
            isActive(link.href)
              ? "text-accent font-semibold"
              : "hover:text-accent"
          }`}
        >
          {link.label}
        </Link>
      ))}

      <Link
        href="/login"
        className={`transition ${
          isActive("/login") ? "text-accent font-semibold" : "hover:text-accent"
        }`}
      >
        {getAuthLabel(displayName, user?.email)}
      </Link>
    </nav>
  );
}
