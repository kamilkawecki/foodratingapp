"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const MobileMenu = ({
  navLinks,
}: {
  navLinks: { href: string; label: string }[];
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button onClick={() => setMenuOpen(true)} className="md:hidden">
        <Menu className="w-6 h-6 text-foreground" />
      </button>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50"
            onClick={(e) => e.stopPropagation()}
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
                  className="transition hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
