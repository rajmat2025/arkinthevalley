"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import PromoBanner from "@/components/PromoBanner";
import type { Promotions } from "@/types/apartment";

const navLinks = [
  { href: "#difference", label: "Why Us" },
  { href: "#explore-huntsville", label: "Explore" },
  { href: "#floor-plans", label: "Floor Plans" },
  { href: "#gallery", label: "Gallery" },
  { href: "#amenities", label: "Amenities" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

interface NavbarProps {
  promotions?: Promotions | null;
}

export default function Navbar({ promotions }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeight = () => setHeaderHeight(header.offsetHeight);

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [promotions, isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 bg-white/95 shadow-sm backdrop-blur-md transition-shadow duration-300"
    >
      {promotions && <PromoBanner promotions={promotions} />}
      <nav
        className="container-narrow flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <a
          href="#"
          className="font-display text-lg font-semibold tracking-tight text-forest-900 sm:text-xl"
        >
          Ark in the Valley
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-warm-700 transition-colors hover:text-forest-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a href="#contact" className="btn-primary">
            Check Availability
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-forest-800 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-warm-200 bg-white px-4 py-6 lg:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-base font-medium text-slate-warm-700 hover:text-forest-700"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                className="btn-primary w-full"
                onClick={() => setIsOpen(false)}
              >
                Check Availability
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
    <div
      aria-hidden="true"
      className="shrink-0"
      style={{ height: headerHeight > 0 ? `${headerHeight}px` : undefined }}
    />
    </>
  );
}
