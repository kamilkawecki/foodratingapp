"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dishes", label: "Dishes" },
  { href: "/dishes/new", label: "Add dish" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="text-black flex items-center justify-between px-10 py-8 border-b border-lightgray shadow-sm bg-white sticky top-0 z-50 h-[100px]">
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
        <Menu className="w-6 h-6 text-foreground" />
      </button>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end items-center py-4 px-10 border-b border-lightgray shadow-sm h-[100px]">
          <button onClick={() => setMenuOpen(false)}>
            <X className="w-6 h-6 text-foreground" />
          </button>
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
