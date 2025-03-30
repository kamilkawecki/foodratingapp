"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/reciepes", label: "Recipes" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="flex items-center justify-between px-10 py-8 border-b border-lightgray shadow-sm bg-white sticky top-0 z-50">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="FoodRating Logo"
            width={140}
            height={40}
            priority
          />
        </Link>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6">
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
      </nav>

      {/* Mobile Menu Toggle */}
      <button onClick={() => setMenuOpen(true)} className="md:hidden">
        toggle
      </button>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setMenuOpen(false)}>Close</button>
        </div>

        <nav className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`transition ${
                isActive(link.href)
                  ? "text-accent font-semibold"
                  : "hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
