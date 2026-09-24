"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (href: string) =>
    pathname === href ? "nav-links active-link" : "nav-links";

  return (
    <header
      className={cn(
        "site-header",
        scrolled && "is-scrolled",
        theme === "light" ? "header-day" : "header-night",
      )}
    >
      <div className="nav-ambient" aria-hidden="true">
        <span className="nav-sheen" />
        <span className="nav-glow nav-glow-a" />
        <span className="nav-glow nav-glow-b" />
        <span className="nav-scanline" />
      </div>

      <nav className="navbar" aria-label="Primary navigation">
        <Link href="/" className="navbar-logo" onClick={closeMenu}>
          <span className="brand-mark">
            <span className="brand-mark-core">MG</span>
            <span className="brand-mark-ring" aria-hidden="true" />
          </span>
          <span className="navbar-wordmark">
            Movie<span className="logo-accent">Grab</span>
          </span>
          <small className="navbar-tag">FILM INDEX</small>
        </Link>

        <button
          className={cn("menu-icon", isOpen && "is-open")}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={isOpen ? "nav-menu active" : "nav-menu"}>
          <Link href="/" className={linkClass("/")} onClick={closeMenu}>
            <span>01</span> Home
          </Link>
          <Link
            href="/movies"
            className={linkClass("/movies")}
            onClick={closeMenu}
          >
            <span>02</span> Browse
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <div className="nav-edge" aria-hidden="true" />
    </header>
  );
}
