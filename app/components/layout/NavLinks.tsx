"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/lib/hooks/useUser";

const baseLinks = [
  { href: "/", label: "Home" },
  { href: "/dishes", label: "Dishes" },
  { href: "/dishes/new", label: "Add Dish" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const { user, displayName } = useUser();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="flex flex-col md:flex-row gap-4 md:gap-6">
      {baseLinks.map((link) => (
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
        {displayName === undefined
          ? "Login"
          : displayName || user?.email || "Login"}
      </Link>
    </nav>
  );
}
